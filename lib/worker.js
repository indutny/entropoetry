'use strict';

const Buffer = require('buffer').Buffer;
const Poetry = require('entropoetry');

postMessage({ type: 'ready' });

const p = new Poetry();

onmessage = (e) => {
  const msg = e.data;

  try {
    if (msg.type === 'stringify') {
      postMessage({
        type: 'stringify',
        seq: msg.seq,
        payload: p.stringify(Buffer.from(msg.payload, 'base64'))
      });
    } else if (msg.type === 'parse') {
      postMessage({
        type: 'parse',
        seq: msg.seq,
        payload: p.parse(msg.payload).toString('base64')
      });
    } else if (msg.type === 'autocomplete') {
      postMessage({
        type: 'autocomplete',
        seq: msg.seq,
        payload: p.autocomplete(msg.payload.line, msg.payload.rhyme)
      });
    }
  } catch (e) {
    postMessage({
      type: 'error',
      seq: msg.seq,
      payload: e.message
    });
  }
};
