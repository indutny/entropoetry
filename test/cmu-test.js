'use strict';

const assert = require('assert');

const { CMU } = require('../lib/cmu');

describe('CMU', () => {
  const cmu = new CMU();

  it('should find vowel sounds for a word', () => {
    assert.deepStrictEqual(cmu.lookup('aberration'), [
      [ 'ae', 2 ], [ 'er', 0 ], [ 'ey', 1 ], [ 'ah', 0 ]
    ]);
  });
});
