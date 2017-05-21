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
      'accept did yer you lay',
      'was get more work and play',
      'of saddle blended fair',
      'got my head when on air',
      'in me as my tears my',
      'avant her startled eye',
      'consists not love me no',
      'you\'ll find the kill har o'
    ].join('\n'));
    assert.deepEqual(p.parse(str), buf);
  });

  it('should stringify/parse with extra padding', () => {
    const p = new Poetry();
    const buf = Buffer.from('nXyllFnGW3nDm9LHXoMeCVQqvr56IFTv3i0ZByvb4KQ=',
                            'base64');
    const str = p.stringify(buf);
    assert.equal(str, [
      'and live arose as from',
      'still pack care was to come',
      'came down with with way hast',
      'love i know not how fast',
      'i think that thou hast not',
      'remembered may on spot',
      'they but of sacra al',
      'the child it is at val',
      'it known thou'
    ].join('\n'));
    assert.deepEqual(p.parse(str), buf);
  });

  it('should do reverse autocomplete', () => {
    const p = new Poetry();
    let list;

    list = p.autocomplete('', null);
    assert(list.some(([ entry ]) => entry === 'from'));

    list = p.autocomplete('from', null);
    assert(list.some(([ entry ]) => entry === 'as'));

    list = p.autocomplete('as from', null);
    assert(list.some(([ entry ]) => entry === 'arose'));

    list = p.autocomplete('', 'from');
    assert(list.some(([ entry ]) => entry === 'come'));

    list = p.autocomplete('come', 'from');
    assert(list.some(([ entry ]) => entry === 'to'));

    list = p.autocomplete('upon the north south seas', null);
    assert(!list);

    list = p.autocomplete('seas', 'too');
    assert(!list);
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
