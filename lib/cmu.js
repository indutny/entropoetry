'use strict';

const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, '..', 'deps', 'cmu.txt');

const SYSTEM = new RegExp('^(' + [
  '\'apostrophe', '\'end-inner-quote', '\'end-quote',  '\'inner-quote',
  '\'quote', '\'single-quote',
].join('|') + ')');

class CMU {
  constructor() {
    const file = fs.readFileSync(DICT_FILE).toString();

    const lines = file.split(/\n/g)
      .map((line) => line.trim().toLowerCase())
      .filter((line) => Boolean(line))
      // Remove comments and words like "'APOSTROPHE"
      .filter((line) => /^['a-z]/.test(line) && !SYSTEM.test(line))
      // Remove variants
      .filter((line) => !/\(\d+\)/.test(line));

    const words = lines.map((line) => {
      const [ word, ...phonemes ] = line.split(/\s+/g);

      const vowels = phonemes.map((phoneme) => {
        const match = phoneme.match(/^([^\d]+)(\d+)$/);
        if (!match) {
          return;
        }

        return [ match[1], parseInt(match[2], 10) ];
      }).filter((vowel) => vowel);

      return [ word, vowels ];
    });

    this.words = new Map(words);
  }

  lookup(word) {
    return this.words.get(word);
  }
}

exports.CMU = CMU;
