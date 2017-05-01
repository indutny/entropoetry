'use strict';

const assert = require('assert');
const Buffer = require('buffer').Buffer;

const Poetry = require('../');

describe('EntroPoetry', () => {
  it('should stringify', () => {
    const p = new Poetry();
    const buf = Buffer.from('ki7BHAGvJyecFt65WmFiP76hVdZ8RVCewQRV4nTxZMA=',
                            'base64');
    console.log(p.stringify(buf));
  });
});
