'use strict';

const util = require('util');
const Buffer = require('buffer').Buffer;
const EventEmitter = require('events').EventEmitter;

function Poet() {
  EventEmitter.call(this);

  this.worker = new Worker('dist/worker.js');
  this.seq = 0;
  this.pending = new Map();

  this.worker.onmessage = (e) => {
    const msg = e.data;
    if (msg.type === 'ready')
      return this.emit('ready');

    const callback = this.pending.get(msg.seq);
    if (!callback)
      return;

    this.pending.delete(msg.seq);
    if (msg.type === 'error')
      callback(new Error(msg.payload));
    else
      callback(null, msg.payload);
  };
}
util.inherits(Poet, EventEmitter);
module.exports = Poet;

Poet.prototype._request = function _request(type, payload, callback) {
  this.worker.postMessage({ type, payload, seq: this.seq });
  this.pending.set(this.seq++, callback);
};

Poet.prototype.stringify = function stringify(buf, callback) {
  this._request('stringify', buf.toString('base64'), callback);
};

Poet.prototype.parse = function parse(string, callback) {
  this._request('parse', string, (err, data) => {
    if (err)
      return callback(err);
    callback(null, Buffer.from(data, 'base64'));
  });
};

Poet.prototype.autocomplete = function autocomplete(line, rhyme, callback) {
  this._request('autocomplete', {
    line, rhyme
  }, callback);
};
