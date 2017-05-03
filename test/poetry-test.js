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
      'you still subject and sage',
      'with dole and wipe the rage',
      'spot where he shows your fame',
      'shall soon who chose the flame',
      'could they had gathered cones',
      'will stand but one grist stones',
      'before his lifted dart',
      'a part'
    ].join('\n'));
    assert.deepEqual(p.parse(str), buf);
  });

  it('should stringify/parse with extra padding', () => {
    const p = new Poetry();
    const buf = Buffer.from('nXyllFnGW3nDm9LHXoMeCVQqvr56IFTv3i0ZByvb4KQ=',
                            'base64');
    const str = p.stringify(buf);
    assert.equal(str, [
      'this world that shift to come',
      'woe all that pause and thumb',
      'or hew those humid wind',
      'a snuffed the clouds of mind',
      'rule by the soul with thee',
      'gift with their guns and he',
      'fair they got her mind'
    ].join('\n'));
    assert.deepEqual(p.parse(str), buf);
  });

  it('should do reverse autocomplete', () => {
    const p = new Poetry();
    let list;

    list = p.autocomplete('', null);
    assert(list.some(([ entry ]) => entry === 'seas'));

    list = p.autocomplete('seas', null);
    assert(list.some(([ entry ]) => entry === 'south'));

    list = p.autocomplete('south seas', null);
    assert(list.some(([ entry ]) => entry === 'north'));

    list = p.autocomplete('', 'seas');
    assert(list.some(([ entry ]) => entry === 'seize'));

    list = p.autocomplete('seize', 'seas');
    assert(list.some(([ entry ]) => entry === 'rather'));

    list = p.autocomplete('upon the north south seas', null);
    assert(!list);

    list = p.autocomplete('seas', 'too');
    assert(!list);
  });

  it('should stringify/parse random data', () => {
    for (let i = 0; i < 10; i++) {
      const p = new Poetry();
      const buf = crypto.randomBytes(32);

      let str;
      try {
        str = p.stringify(buf);
      } catch (e) {
        assert(/can\'t rhyme|like this data/i.test(e.message));
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
