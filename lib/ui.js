'use strict';

const Buffer = require('buffer').Buffer;
const Poet = require('./ui/poet');

const p = new Poet();

const DELAY = 100;

const elems = {
  key: document.getElementById('key'),
  poem: document.getElementById('poem')
};

function onChange(elem, callback) {
  let timer;

  const fire = () => {
    callback(elem.value);
  };

  const onchange = () => {
    clearTimeout(timer);
    timer = setTimeout(fire, DELAY);
  };

  elem.onkeypress = onchange;
  elem.onkeyup = onchange;
}

p.on('ready', () => {
  function show() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'inherit';
  }

  function retry() {
    const rnd = Buffer.alloc(32);
    for (let i = 0; i < 32; i++)
      rnd[i] = (Math.random() * 0x100) | 0;

    p.stringify(rnd, (err, lines) => {
      if (err)
        return retry();

      elems.key.value = rnd.toString('hex');
      elems.poem.value = lines;
      show();
    });
  }
  retry();
});

onChange(elems.key, (key) => {
  let buf;
  try {
    buf = Buffer.from(key.replace(/[\r\n\s]+/g, ''), 'hex');
  } catch (e) {
    elems.poem.value = e.message;
    return;
  }

  p.stringify(buf, (err, lines) => {
    if (err) {
      elems.poem.value = err.message;
      return;
    }

    elems.poem.value = lines;
  });
});

onChange(elems.poem, (poem) => {
  p.parse(poem, (err, buf) => {
    if (err) {
      elems.key.value = err.message;
      return;
    }

    elems.key.value = buf.toString('hex');
  });
});
