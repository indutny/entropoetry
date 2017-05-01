'use strict';

const assert = require('assert');
const BN = require('bn.js');

const huffman = require('./huffman');

const NEVER_STRESS = new Set([
  'a', 'the',
  'and', 'or', 'nor',
  'on', 'off', 'in', 'at', 'of', 'for', 'to', 'as'
]);

const PHONETIC_DICT = require('./data/dict.json');
const ALL_WORDS = Object.keys(PHONETIC_DICT);
const MARKOV_TABLE = require('./data/markov.json');
let REV_MARKOV_TABLE;

const DEFAULT_METRE = [ 0, 1, 0, 1, 0, 1 ];

function Poetry(metre) {
  this.metre = metre || DEFAULT_METRE;

  this._context = '';
  this._syllables = this.metre.length;
  this._rhyme = false;
  this._rhymeWord = null;
}
module.exports = Poetry;

Poetry.prototype.stringify = function stringify(buf) {
  this._reset();

  const num = new BN(buf, 'le');

  const out = [];
  const lines = [];

  let line = [];
  let codes = false;
  let bitsLeft = buf.length * 8;
  let lineBits = 0;
  while (bitsLeft !== 0 || codes !== false) {
    if (!codes)
      codes = this._huffman().backward;

    const bit = num.testn(0) ? 1 : 0;
    num.ishrn(1);
    bitsLeft = Math.max(0, bitsLeft - 1);

    lineBits++;

    codes = codes[bit];
    if (typeof codes !== 'string')
      continue;

    const word = codes;
    codes = false;

    const [ _, stress, rhyme ] = PHONETIC_DICT[word];
    line.push(word);

    // Rhyme last words
    if (this._syllables === this.metre.length) {
      if (this._rhyme)
        this._rhyme = false;
      else
        this._rhyme = rhyme;
      this._rhymeWord = word;
    }

    this._syllables -= stress.length;
    this._context = word;

    if (this._syllables !== 0)
      continue;

    // Push line!
    this._syllables = this.metre.length;
    this._context = '';
    lines.push(line.reverse().join(' '));

    const alignment = 8 - (lineBits % 8);
    lineBits = 0;

    line = [];

    // Tricky part
    if (alignment === 8 || bitsLeft <= alignment)
      continue;

    // Shift leftovers to align each line on a byte boundary
    // This is important to make errors local
    const next = num.maskn(alignment);
    num.ishrn(alignment);
    num.ior(next.ishln(bitsLeft - alignment));
  }

  if (line.length !== 0)
    lines.push(line.reverse().join(' '));

  return lines.join('\n');
};

Poetry.prototype.parse = function parse(text) {
  this._reset();

  const lines = text.toLowerCase().replace(/[^a-z'\s]+/g, '').split(/\n/g)
      .map(x => x.trim()).filter(x => x);
  const sequences = [];

  let codes = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(/\s+/g);
    const lineCodes = [];
    let bits = 0;

    this._context = '';
    this._syllables = this.metre.length;
    for (let j = line.length - 1; j >= 0; j--) {
      const word = line[j];
      const codes = this._huffman().forward;
      this._context = word;

      const code = codes.get(word);
      assert(code, 'Invalid input, word unknown');

      const [ _, stress, rhyme ] = PHONETIC_DICT[word];

      // Rhyme last words
      if (this._syllables === this.metre.length) {
        if (i % 2 === 1)
          this._rhyme = false;
        else
          this._rhyme = rhyme;
        this._rhymeWord = word;
      }

      this._syllables -= stress.length;
      bits += code.length;
      lineCodes.push(code);
    }

    const num = new BN(0);
    for (let i = lineCodes.length - 1; i >= 0; i--) {
      const code = lineCodes[i];
      for (let j = code.length - 1; j >= 0; j--) {
        num.ishln(1);
        num.setn(0, code[j]);
      }
    }

    const pad = bits % 8 === 0 ? 0 : (8 - bits % 8);
    sequences.push({ num, bits, pad });
  }

  // Append padding
  for (let i = sequences.length - 1; i >= 0; i--) {
    const seq = sequences[i];

    if (seq.pad === 0)
      continue;

    let left = seq.pad;
    for (let j = sequences.length - 1; j > i; j--) {
      const next = sequences[j];

      const take = Math.min(left, next.bits);
      const pad = next.num.shrn(next.bits - take);
      next.bits -= take;
      next.num.imaskn(next.bits);

      seq.num.ior(pad.ishln(seq.bits));
      seq.bits += take;
      left -= take;

      if (left === 0)
        break;
    }

    // NOTE: if `left != 0` - the reset of the padding is zero
    seq.pad = 0;
  }

  const out = new BN(0);
  for (let i = sequences.length - 1; i >= 0; i--) {
    const { num, bits } = sequences[i];
    out.ishln(bits);
    out.ior(num);
  }

  return out.toBuffer('le');
};

Poetry.prototype.autocomplete = function autocomplete(line, rhyme, normal) {
  normal = normal !== false;
  this._reset();

  const words = line.toLowerCase().replace(/[^a-z'\s]+/g, '').trim()
      .split(/\s+/g);

  if (!normal)
    words.reverse();

  if (rhyme) {
    rhyme = rhyme.toLowerCase().replace(/[^a-z']+/g);

    this._rhymeWord = rhyme;
    let _;
    [ _, _, rhyme ] = PHONETIC_DICT[rhyme];
    if (!rhyme)
      return false;
    this._rhyme = rhyme;
  }

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word)
      continue;

    if (!PHONETIC_DICT.hasOwnProperty(word))
      return false;
    if (!this._filter(word, normal))
      return false;

    const [ _, stress ] = PHONETIC_DICT[word];
    this._context = word;
    this._syllables -= stress.length;
  }

  if (this._syllables === 0)
    return false;

  try {
    return this._huffman(normal).list;
  } catch (e) {
    return false;
  }
};

// Private

Poetry.prototype._huffman = function _huffman(normal) {
  let filtered;
  let markov;

  if (normal)
    markov = this._revMarkov();
  else
    markov = MARKOV_TABLE;

  // There may not be a continuation of sequence
  const table = markov[this._context];
  if (table)
    filtered = table.filter(([ word ]) => this._filter(word, normal));
  else
    filtered = [];

  // Huffman codes do not work for length < 2
  if (filtered.length < 2)
    filtered = markov[''].filter(([ word ]) => this._filter(word, normal));

  if (filtered.length < 2) {
    filtered = ALL_WORDS.filter(word => this._filter(word, normal)).slice(0, 2);
    filtered = filtered.map(word => [ word, 1 ]);
  }

  assert(filtered.length >= 2, 'can\'t rhyme');
  return huffman(filtered);
};

Poetry.prototype._filter = function _filter(word, normal) {
  const [ sounds, stress, rhyme ] = PHONETIC_DICT[word];
  if (stress.length > this._syllables)
    return false;

  let needRhyme;
  if (normal)
    needRhyme = this._syllables === stress.length;
  else
    needRhyme = this._syllables === this.metre.length;

  // Last words must rhyme
  if (needRhyme && this._rhyme) {
    // Do not repeat the word, it is lame
    if (word === this._rhymeWord)
      return false;

    if (rhyme.length !== this._rhyme.length)
      return false;

    for (var i = 0; i < this._rhyme.length; i++)
      if (this._rhyme[i] !== rhyme[i])
        return false;
  }

  let metreOffset;
  if (normal)
    metreOffset = this.metre.length - this._syllables;
  else
    metreOffset = this._syllables - stress.length;

  if (stress.length === 1) {
    const isStressed = this.metre[metreOffset];
    if (isStressed && NEVER_STRESS.has(word))
      return false;
    return true;
  }

  for (var i = 0; i < stress.length; i++)
    if (this.metre[metreOffset + i] !== stress[i])
      return false;

  return true;
};

Poetry.prototype._reset = function _reset() {
  this._context = '';
  this._syllables = this.metre.length;
  this._rhyme = false;
  this._rhymeWord = null;
};

Poetry.prototype._revMarkov = function _revMarkov() {
  if (!REV_MARKOV_TABLE)
    REV_MARKOV_TABLE = require('./data/rev-markov.json');
  return REV_MARKOV_TABLE;
};
