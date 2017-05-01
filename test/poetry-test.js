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

  it('should autocomplete', () => {
    const p = new Poetry();
    let list;

    list = p.autocomplete('');
    assert(list.some(([ entry ]) => entry === 'seas'));

    list = p.autocomplete('seas');
    assert(list.some(([ entry ]) => entry === 'south'));

    list = p.autocomplete('south seas');
    assert(list.some(([ entry ]) => entry === 'north'));

    list = p.autocomplete('', 'seas');
    assert(list.some(([ entry ]) => entry === 'seize'));

    list = p.autocomplete('seize', 'seas');
    assert(list.some(([ entry ]) => entry === 'rather'));

    list = p.autocomplete('upon the north south seas');
    assert(!list);

    list = p.autocomplete('seas', 'too');
    assert(!list);
  });
});
