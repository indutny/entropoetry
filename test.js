'use strict';

const dict = require('./tools/data/dict.json');
const markov = require('./tools/data/markov.json');

const ONE_NO_STRESS = [
  'a', 'the',
  'and', 'or', 'nor',
  'on', 'off', 'in', 'at', 'of', 'for', 'to', 'as'
];

const metre = [ 0, 1, 0, 1, 0, 1, 0, 1 ];

function random(prev) {
  const submarkov = markov[prev] || markov[null];
  for (;;) {
    let r = Math.random();
    let word;
    for (let i = 0; i < submarkov.length; i++) {
      word = submarkov[i];
      r -= word[1];
      if (r <= 0)
        break;
    }

    for (let i = 0; i < dict.length; i++) {
      if (dict[i].word === word[0])
        return dict[i];
    }
  }
}

function line(metre, match) {
  let syllables = 0;
  let res = [];
  let rhyme = null;
  let prev = null;
  let tries = 0;
  while (syllables < metre.length) {
    const word = random(prev);
    tries++;
    if (tries === 1000) {
      console.log('global');
      prev = null;
    }
    if (tries === 10000) {
      tries = 0;
      console.log('restart');
      res = [];
      rhyme = null;
      prev = null;
      syllables = 0;
    }

    if (word.stress.length === 1) {
      const shouldStress = metre[metre.length - syllables - 1];
      // Don't put stress on `to`, `at`, `the`, ...
      if (shouldStress && ONE_NO_STRESS.includes(word.word))
        continue;
    } else {
      const expected = metre.slice(
          metre.length - syllables - word.stress.length,
          metre.length - syllables);
      const actual = word.stress.map(s => s ? 1 : 0);
      if (actual.join('.') !== expected.join('.'))
        continue;
    }

    if (syllables === 0) {
      rhyme = word.rhyme.map(({ sound }) => sound);
      if (match && rhyme.join('.') !== match.join('.'))
        continue;
    }

    tries = 0;
    prev = word.word;
    res.push(word.word);
    syllables += word.stress.length;
  }

  return { line: res.reverse().join(' '), rhyme };
}

const l1 = line(metre);
const l2 = line(metre);
const l3 = line(metre, l1.rhyme);
const l4 = line(metre, l2.rhyme);
console.log(l1.line);
console.log(l2.line);
console.log(l3.line);
console.log(l4.line);
