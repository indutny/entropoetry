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

    let maxLength = 0;
    const words = lines.map((line) => {
      const [ word, ...phonemes ] = line.split(/\s+/g);

      const parsed = phonemes.map((phoneme) => {
        const match = phoneme.match(/^([^\d]+)(\d+)$/);
        if (!match) {
          return;
        }

        return [ match[1], parseInt(match[2], 10) ? 1 : 0 ];
      }).filter((vowel) => vowel);

      const vowels = [];
      const stress = [];

      for (const [ vowel, stressValue ] of parsed) {
        vowels.push(vowel);
        stress.push(stressValue);
      }

      maxLength = Math.max(maxLength, stress.length);

      return [ word, { vowels, stress } ];
    });

    this.trie = new Array(1 << (maxLength + 1));
    for (let i = 0; i < this.trie.length; i++) {
      this.trie[i] = [];
    }

    for (const [ word, info ] of words) {
      let trieKey = 0;
      for (const [ i, value ] of info.stress.entries()) {
        trieKey |= (value << i);
      }
      trieKey |= 1 << info.stress.length;

      this.trie[trieKey].push({ word, ...info });
    }

    this.words = new Map(words);
  }

  lookup(word) {
    return this.words.get(word);
  }

  lookupByStress(stress, isExact = false) {
    const results = [];

    let trieKey = 0;
    for (let i = 0; i < stress.length; i++) {
      trieKey |= stress[i] << i;

      if (isExact && i !== stress.length - 1) {
        continue;
      }

      for (const entry of this.trie[trieKey | (1 << (i + 1))]) {
        results.push(entry);
      }
    }

    return results;
  }

  *[Symbol.iterator]() {
    for (const [ key, value ] of this.words.entries()) {
      yield [ key, value ];
    }
  }
}

exports.CMU = CMU;
