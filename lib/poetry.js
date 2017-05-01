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

const DEFAULT_METRE = [ 0, 0, 1, 0, 0, 1 ];

function Poetry(metre) {
  this.metre = metre || DEFAULT_METRE;

  this._context = '';
  this._syllables = this.metre.length;
  this._rhyme = false;
  this._rhymeWord = null;
}
module.exports = Poetry;

Poetry.prototype._reset = function _reset() {
  this._context = '';
  this._syllables = this.metre.length;
  this._rhyme = false;
  this._rhymeWord = null;
};

Poetry.prototype.stringify = function stringify(buf) {
  this._reset();

  const num = new BN(buf);

  const out = [];
  const lines = [];

  let line = [];
  let codes = false;
  while (num.cmpn(0) !== 0 || codes !== false) {
    if (!codes)
      codes = this._huffman().backward;

    const bit = num.testn(0) ? 1 : 0;
    num.ishrn(1);

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
    line = [];
  }
  if (line.length !== 0)
    lines.push(line.reverse().join(' '));

  return lines.join('\n');
};

Poetry.prototype.parse = function parse(text) {
  this._reset();

  const out = new BN(0);
  const lines = text.toLowerCase().replace(/[^a-z'\s]+/g, '').split(/\n/g)
      .map(x => x.trim()).filter(x => x);

  let codes = false;
  for (let i = 0; i < lines.length; i++) {
    if (!codes)
      codes = this._huffman().forward;

    const line = lines[i].split(/\s+/g);

    for (let j = line.length - 1; j >= 0; j--) {
      const word = line[j];

      const code = codes.get(word);
      console.log(code, word);
      assert(code, 'Invalid input, word unknown');
    }
  }
};

Poetry.prototype._huffman = function _huffman() {
  let filtered;

  // There may not be a continuation of sequence
  const table = MARKOV_TABLE[this._context];
  if (table)
    filtered = table.filter(([ word ]) => this._filter(word));
  else
    filtered = [];

  // Huffman codes do not work for length < 2
  if (filtered.length < 2)
    filtered = MARKOV_TABLE[''].filter(([ word ]) => this._filter(word));

  if (filtered.length < 2) {
    filtered = ALL_WORDS.filter(word => this._filter(word)).slice(0, 2);
    filtered = filtered.map(word => [ word, 1 ]);
  }

  assert(filtered.length >= 2, 'can\'t rhyme');
  return huffman(filtered);
};

Poetry.prototype._filter = function _filter(word) {
  const [ sounds, stress, rhyme ] = PHONETIC_DICT[word];
  if (stress.length > this._syllables)
    return false;

  // Last words must rhyme
  if (this._syllables === this.metre.length && this._rhyme) {
    // Do not repeat the word, it is lame
    if (word === this._rhymeWord)
      return false;

    if (rhyme.length !== this._rhyme.length)
      return false;

    for (var i = 0; i < this._rhyme.length; i++)
      if (this._rhyme[i] !== rhyme[i])
        return false;
  }

  if (stress.length === 1) {
    const isStressed = this.metre[this._syllables - 1];
    if (isStressed && NEVER_STRESS.has(word))
      return false;
    return true;
  }

  for (var i = 0; i < stress.length; i++)
    if (this.metre[this._syllables - stress.length + i] !== stress[i])
      return false;

  return true;
};
