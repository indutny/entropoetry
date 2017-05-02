'use strict';

const crypto = require('crypto')
const Buffer = require('buffer').Buffer;
const Poet = require('../');

const START = (Math.random() * 0x100000000) >>> 0;

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

for (let i = 0; i < 0xffffffff; i++) {
  const seed = START + i;
  pack.writeUInt32BE(seed, data.length);

  const hash = crypto.createHash('sha512').update(pack.slice(0, 4)).digest();
  for (let j = 0; j < data.length; j++)
    pack[j] = data[j] ^ hash[j];
  console.log(pack);

  let poem;
  try {
    poem = p.stringify(pack);
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
