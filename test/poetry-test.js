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
      'upon the north south seas',
      'gods may say rather seize',
      'the spring breeze chirps and farms',
      'of coal his mother\'s arms',
      'men might he never stoops',
      'bones through the slight his troops',
      'shall just how they pursue',
      'word then they will too'
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
