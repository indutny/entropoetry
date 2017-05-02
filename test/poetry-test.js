'use strict';

const assert = require('assert');
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
      'must soon who chose the flame',
      'that they had gathered cones',
      'of thunder from the groans',
      'day when a broken heart',
      'maiden who where art'
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
      'and care may be no wind',
      'wings how could catch you kind',
      'poor fellow\'s face and moon',
      'but it the sight o\' june',
      'pulse he got her mind'
    ].join('\n'));
    assert.deepEqual(p.parse(str), buf);
  });

  it('should do normal autocomplete', () => {
    const p = new Poetry();
    let list;

    list = p.autocomplete('');
    assert(list.some(([ entry ]) => entry === 'upon'));

    list = p.autocomplete('upon the');
    assert(list.some(([ entry ]) => entry === 'north'));

    list = p.autocomplete('upon the', 'south');
    assert(list.some(([ entry ]) => entry === 'north'));

    list = p.autocomplete('upon the north south', 'seize');
    assert(list.some(([ entry ]) => entry === 'seas'));

    list = p.autocomplete('upon the north south', 'too');
    assert(!list.some(([ entry ]) => entry === 'seas'));
  });

  it('should do reverse autocomplete', () => {
    const p = new Poetry();
    let list;

    list = p.autocomplete('', null, false);
    assert(list.some(([ entry ]) => entry === 'seas'));

    list = p.autocomplete('seas', null, false);
    assert(list.some(([ entry ]) => entry === 'south'));

    list = p.autocomplete('south seas', null, false);
    assert(list.some(([ entry ]) => entry === 'north'));

    list = p.autocomplete('', 'seas', false);
    assert(list.some(([ entry ]) => entry === 'seize'));

    list = p.autocomplete('seize', 'seas', false);
    assert(list.some(([ entry ]) => entry === 'rather'));

    list = p.autocomplete('upon the north south seas', null, false);
    assert(!list);

    list = p.autocomplete('seas', 'too', false);
    assert(!list);
  });
});
