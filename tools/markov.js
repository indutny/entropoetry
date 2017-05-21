'use strict';

const fs = require('fs');

const dict = JSON.parse(fs.readFileSync(process.argv[2]).toString());
const lines = fs.readFileSync(process.argv[3]).toString()
    .split('\n').map(x => x.trim()).filter(x => x);
const isReverse = process.argv[4] === 'rev';

const map = new Map();

const uniqueLines = new Set();
lines.map((line) => {
  return line.toLowerCase().replace(/[^a-z\s']+/g, '')
                    .trim()
                    .replace(/^'+|'+$/g, '');
}).filter(line => line).forEach((line) => {
  uniqueLines.add(line);
});
console.error('Number of unique lines: %d', uniqueLines.size);

// All words
const allWords = new Map();
map.set('', allWords);

function increment(map, word) {
  if (map.has(word))
    map.set(word, map.get(word) + 1);
  else
    map.set(word, 1);
}

function dig(map, word) {
  let submap;
  if (map.has(word)) {
    submap = map.get(word);
  } else {
    submap = new Map();
    map.set(word, submap);
  }
  return submap;
}

let pprev = '';
let prev = '';
let linesParsed = 0;
uniqueLines.forEach((line) => {
  const words = line.split(/\s+/g);

  words.forEach((word) => {
    // Filter out empty words
    if (!word)
      return;

    // Skip unknown words
    if (!dict.hasOwnProperty(word)) {
      prev = '';
      pprev = '';
      return;
    }

    if (pprev !== '' && prev !== '')
      increment(dig(map, pprev + ':' + prev), word);
    if (prev !== '')
      increment(dig(map, prev), word);
    increment(allWords, word);

    pprev = prev;
    prev = word;
  });

  linesParsed++;
});
console.error('Number of words parsed: %d', allWords.size);

const out = {};
map.forEach((leaf, key) => {
  let total = 0;
  leaf.forEach(count => total += count);

  const words = [];
  leaf.forEach((count, word) => {
    words.push({ word, count });
  });
  words.sort((a, b) => b.count - a.count);

  out[key] = words.map(({ word, count }) => [ word, count ]);
});

console.log(JSON.stringify(JSON.stringify(out)));
