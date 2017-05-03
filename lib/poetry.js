'use strict';

const assert = require('assert');
const BN = require('bn.js');

const huffman = require('./huffman');

const DEBUG = false;

const NEVER_STRESS = new Set([
  'a', 'the',
  'and', 'or', 'nor',
  'on', 'off', 'in', 'at', 'of', 'for', 'to', 'as'
]);

const PHONETIC_DICT = require('./data/dict.json');
const MARKOV_TABLE = require('./data/markov.json');
const ALL_WORDS = Object.keys(MARKOV_TABLE)
    .filter(x => x && PHONETIC_DICT.hasOwnProperty(x));

const DEFAULT_METRE = [ 0, 1, 0, 1, 0, 1 ];
const ALIGNMENT = 8;

function Poetry(metre) {
  this.metre = metre || DEFAULT_METRE;

  this._context = '';
  this._syllables = this.metre.length;
  this._rhyme = false;
  this._rhymeWord = null;
}
module.exports = Poetry;

Poetry.prototype._debug = function _debug() {
  if (!DEBUG)
    return;

  console.error.apply(console, arguments);
};

Poetry.prototype.stringify = function stringify(buf) {
  this._reset();

  const num = new BN(buf, 'le');

  let copy;
  if (DEBUG)
    copy = num.clone();

  const out = [];
  const lines = [];

  let line = [];
  let codes = false;
  let bitsLeft = buf.length * 8;
  let lineBits = 0;
  let totalBits = 0;
  while (bitsLeft !== 0 || codes !== false) {
    if (!codes)
      codes = this._huffman().backward;

    const bit = num.testn(0) ? 1 : 0;
    num.ishrn(1);
    bitsLeft = Math.max(0, bitsLeft - 1);

    lineBits++;
    totalBits++;

    codes = codes[bit];
    if (typeof codes !== 'string')
      continue;

    const word = codes;
    codes = false;

    const [ stress, rhyme ] = this._dict(word);
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

    const alignment = ALIGNMENT - (lineBits % ALIGNMENT);
    if (DEBUG) {
      this._debug('str-add', copy.maskn(lineBits), 'align', alignment);
      copy.ishrn(lineBits);
    }

    lineBits = 0;
    line = [];

    // Tricky part
    if (alignment === ALIGNMENT || bitsLeft <= alignment)
      continue;

    // Shift leftovers to align each line on a byte boundary
    // This is important to make errors local
    const next = num.maskn(alignment);
    this._debug('str-pad', next);

    num.ishrn(alignment);
    num.ior(next.ishln(bitsLeft - alignment));

    if (DEBUG) {
      copy.ishrn(alignment);
      copy.ior(next);
    }
  }

  if (DEBUG)
    this._debug('str-left', copy);

  // We can't unpad if the difference is bigger than 1 byte
  if (Math.floor(totalBits / 8) > buf.length)
    throw new Error('No inspiration, try different input');

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
  let totalBits = 0;
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

      const [ stress, rhyme ] = this._dict(word);

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

    const pad = bits % ALIGNMENT === 0 ? 0 : (ALIGNMENT - bits % ALIGNMENT);
    sequences.push({ num, bits, pad });
    totalBits += bits;
  }

  this._debug(totalBits);
  if (totalBits % 8 !== 0) {
    // Remove extra padding from the last word
    const last = sequences[sequences.length - 1];
    const pad = totalBits % 8;
    last.bits -= pad;
    last.num.imaskn(last.bits);
  }

  this._debug('parse-pre', sequences);

  // Append padding
  for (let i = sequences.length - 1; i >= 0; i--) {
    const seq = sequences[i];

    if (seq.pad === 0)
      continue;

    this._debug('  parse-pad-pre', seq);

    let left = seq.pad;
    for (let j = sequences.length - 1; j > i; j--) {
      const next = sequences[j];
      const take = Math.min(left, next.bits);

      this._debug('    parse-pad-next', next, take);

      next.bits -= take;
      const pad = next.num.shrn(next.bits);
      this._debug('    parse-pad-took', pad);

      next.num.imaskn(next.bits);

      seq.num.ior(pad.ishln(seq.bits + left - take));
      left -= take;

      if (left === 0)
        break;
    }

    // Shift partial padding
    if (left !== 0) {
      const head = seq.num.shrn(seq.bits);
      head.ishrn(left);

      seq.num.imaskn(seq.bits);
      seq.num.ior(head.ishln(seq.bits));
    }

    // NOTE: if `left != 0` - the reset of the padding is zero
    seq.bits += seq.pad - left;
    seq.pad = 0;

    this._debug('  parse-pad-post', seq);
  }

  this._debug('parse-post', sequences);

  const out = new BN(0);
  let outBits = 0;
  for (let i = sequences.length - 1; i >= 0; i--) {
    const { num, bits } = sequences[i];
    out.ishln(bits);
    out.ior(num);
    outBits += bits;
  }

  this._debug('parse-out', out);

  return out.toBuffer('le', Math.ceil(outBits / 8));
};

Poetry.prototype.autocomplete = function autocomplete(line, rhyme) {
  this._reset();

  const words = line.toLowerCase().replace(/[^a-z'\s]+/g, '').trim()
      .split(/\s+/g);

  words.reverse();

  if (rhyme) {
    rhyme = rhyme.toLowerCase().replace(/[^a-z']+/g);

    this._rhymeWord = rhyme;
    let _;
    [ _, rhyme ] = this._dict(rhyme);
    if (!rhyme)
      return false;
    this._rhyme = rhyme;
  }

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word)
      continue;

    const phonetic = this._dict(word);
    if (!phonetic)
      return false;
    if (!this._filter(word))
      return false;

    const [ stress ] = phonetic;
    this._context = word;
    this._syllables -= stress.length;
  }

  if (this._syllables === 0)
    return false;

  try {
    return this._huffman().list;
  } catch (e) {
    return false;
  }
};

// Private

Poetry.prototype._dict = function _dict(word) {
  return PHONETIC_DICT[word];
};

Poetry.prototype._huffman = function _huffman() {
  let filtered;
  const markov = MARKOV_TABLE;

  const filter = (entry) => this._filter(entry[0]);

  // There may not be a continuation of sequence
  const table = markov[this._context];
  if (table)
    filtered = table.filter(filter);
  else
    filtered = [];

  // Huffman codes do not work for length < 2, try all words seen in all poems
  // ordered by global frequency
  if (filtered.length < 2) {
    this._debug('global match');
    filtered = markov['*'].filter(filter);
  }

  // No words still? Try all english words that we know
  if (filtered.length < 2) {
    this._debug('every match');
    filtered = ALL_WORDS.filter(word => this._filter(word));
    filtered = filtered.map(word => [ word, 1 ]);
  }

  assert(filtered.length >= 2, 'can\'t rhyme');
  return huffman(filtered);
};

Poetry.prototype._filter = function _filter(word) {
  const phonetic = this._dict(word);
  const stress = phonetic[0];
  if (stress.length > this._syllables)
    return false;

  const needRhyme = this._syllables === this.metre.length;

  // Last words must rhyme
  if (needRhyme && this._rhyme) {
    // Do not repeat the word, it is lame
    if (word === this._rhymeWord)
      return false;

    const rhyme = phonetic[1];
    if (rhyme.length !== this._rhyme.length)
      return false;

    for (var i = 0; i < this._rhyme.length; i++)
      if (this._rhyme[i] !== rhyme[i])
        return false;
  }

  const metreOffset = this._syllables - stress.length;

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
