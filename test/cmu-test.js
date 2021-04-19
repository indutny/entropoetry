'use strict';

const assert = require('assert');

const { CMU } = require('../lib/cmu');

describe('CMU', () => {
  const cmu = new CMU();

  it('should find vowel sounds for a word', () => {
    assert.deepStrictEqual(cmu.lookup('aberration'), {
      vowels: [ 'ae', 'er', 'ey', 'ah' ],
      stress: [ 1, 0, 1, 0],
    });
  });

  it('should support iteration over the words', () => {
    let found;
    for (const [ word, phonemes ] of cmu) {
      if (word === 'door') {
        found = phonemes;
        break;
      }
    }

    assert.deepStrictEqual(found, {
      vowels: [ 'ao' ],
      stress: [ 1 ],
    });
  });

  it('should support exact trie lookup by stress', () => {
    const results = cmu.lookupByStress([ 0, 1, 0, 1, 0, 1, 0 ], true)
      .map(({ word }) => word);

    assert.deepStrictEqual(results, [
      'assicurazioni',
      'computer-generated',
      'denuclearization',
      'environmentalism',
      'undifferentiated'
    ]);
  });

  it('should support inexact trie lookup by stress', () => {
    const key = [ 0, 1, 0, 1 ];

    const results = cmu.lookupByStress(key);

    for (const { word, stress } of results) {
      assert(stress.length <= 4, `Invalid word: ${word}`);

      for (let i = 0; i < stress.length; i++) {
        assert.strictEqual(stress[i], key[i],
          `Invalid stress at ${i} for ${word}`);
      }
    }
  });
});
