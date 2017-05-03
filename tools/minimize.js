'use strict';

const crypto = require('crypto')
const Buffer = require('buffer').Buffer;
const Poet = require('../');

const p = new Poet();

const data = Buffer.from(process.argv[2], 'base64');

const pack = Buffer.concat([
  data,
  Buffer.alloc(4)
]);

const min = {
  seed: 0,
  len: Infinity,
  poem: ''
};

let tries = 0;
let size = 1;
for (let i = 0; i < 0xffffffff; i++) {
  const seed = (Math.random() * 0x100000000) >>> 0;
  if (size === 1)
    pack.writeUInt8(seed & 0xff, data.length);
  else if (size === 1)
    pack.writeUInt16BE(seed & 0xffff, data.length);
  else if (size === 2)
    pack.writeUInt32BE(seed, data.length);

  tries++;
  if (tries === 0x100 || tries === 0x10000 || tries === 0x1000000) {
    size++;
    console.error('size bump');
  }

  const hash = crypto.createHash('sha512')
      .update(pack.slice(data.length, data.length + size))
      .digest();
  for (let j = 0; j < data.length; j++)
    pack[j] = data[j] ^ hash[j];

  let poem;
  try {
    poem = p.stringify(pack.slice(0, data.length + size));
  } catch (e) {
    continue;
  }
  if (poem.length >= min.len)
    continue;

  min.poem = poem;
  min.len = poem.length;
  min.seed = seed;
  console.log(min);
}
