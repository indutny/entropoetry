'use strict';

const assert = require('assert');
const crypto = require('crypto');
const Buffer = require('buffer').Buffer;

const Poetry = require('../');

describe('EntroPoetry', () => {
  it('should stringify/parse', () => {
    const p = new Poetry();
    const buf = Buffer.from('pNgTfYNCkabhDTeezPYLhFv7Y65aivAK7MsBmOU4caM=',
                            'base64');

    const str = p.stringify(buf);
    assert.equal(str, [
      'and one step higher leaves',
      'in sweet consent a sleeves',
      'the them sweet thy sleep would',
      'more should meet an of good',
      'how just a block find mine',
      'be hidden theme i pine',
      'will last if used fine so',
      'lord howard brow hath low',
      'in dread succession thy',
      'transgressions'
    ].join('\n'));
    assert.deepEqual(p.parse(str), buf);
  });

  it('should stringify/parse with extra padding', () => {
    const p = new Poetry();
    const buf = Buffer.from('nxyllFnGW3nDm9LHXoMeCVQqvr56IFTv3i0ZByvb4KQ=',
                            'base64');
    const str = p.stringify(buf);
    assert.equal(str, [
      'run love work shall hold front',
      'the evening mists thou shunt',
      'with dreadful din when joys',
      'on my thought i loved poise',
      'her wood i care she can',
      'for all that he was dan',
      'in tent when govern well',
      'and wisely winks the dwell',
      'and'
    ].join('\n'));
    assert.deepEqual(p.parse(str), buf);
  });

  it('should stringify/parse random data', () => {
    for (let i = 0; i < 30; i++) {
      const p = new Poetry();
      const buf = crypto.randomBytes(32);

      let str;
      try {
        str = p.stringify(buf);
      } catch (e) {
        assert(/can\'t rhyme|no inspiration/i.test(e.message), e.message);
        continue;
      }

      const actual = p.parse(str);
      if (actual.toString('hex') === buf.toString('hex'))
        continue;

      console.log(buf.toString('hex'));
      assert.deepEqual(actual, buf);
    }
  });
});
