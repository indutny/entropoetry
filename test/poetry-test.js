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
      'and tried its be not if',
      'while all this is a stiff',
      'rents all wept love framed since',
      'my fall shall crush with rinse',
      'to let a tear she\'d found',
      'when said the only sound',
      'of waters soothes remove',
      'and not praise'
    ].join('\n'));
    assert.deepEqual(p.parse(str), buf);
  });

  it('should stringify/parse with extra padding', () => {
    const p = new Poetry();
    const buf = Buffer.from('nXyllFnGW3nDm9LHXoMeCVQqvr56IFTv3i0ZByvb4KQ=',
                            'base64');
    const str = p.stringify(buf);
    assert.equal(str, [
      'lieutenant let of long',
      'dead i will come no throng',
      'as letters all of its',
      'condensed i my thoughts fits',
      'and her hands he beat all',
      'hell should rise with the ball',
      'scarce whose not valley gods',
      'home all day but the pods',
      'your evil one giles him'
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

  it('should stringify/parse regression', () => {
    const p = new Poetry();
    const buf = Buffer.from('45c35f98488863a730c82fa2eb68196f' +
                                '680746abc6ec70ac24b7686246b70e3b',
                            'hex');

    assert.deepEqual(p.parse(p.stringify(buf)), buf);
  });

  it('should stringify/parse all zeroes', () => {
    const p = new Poetry();
    const buf = Buffer.from('00000000000000000000000000000000' +
                                '00000000000000000000000000000000',
                            'hex');

    assert.deepEqual(p.parse(p.stringify(buf)), buf);
  });
});
