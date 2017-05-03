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
map.set('*', allWords);

function increment(map, word) {
  if (map.has(word))
    map.set(word, map.get(word) + 1);
  else
    map.set(word, 1);
}

let linesParsed = 0;
uniqueLines.forEach((line) => {
  const words = line.split(/\s+/g);

  let prev = '';
  if (!isReverse)
    words.reverse();

  words.forEach((word) => {
    // Filter out empty words
    if (!word)
      return;

    // Skip unknown words
    if (!dict.hasOwnProperty(word)) {
      prev = null;
      return;
    }

    increment(allWords, word);

    // Resume after unknown words
    if (prev === null) {
      prev = word;
      return;
    }

    let submap;
    if (map.has(prev)) {
      submap = map.get(prev);
    } else {
      submap = new Map();
      map.set(prev, submap);
    }
    increment(submap, word);
    prev = word;
  });

  linesParsed++;
});
console.error('Number of words parsed: %d', allWords.size);

const out = {};
map.forEach((submap, key) => {
  let total = 0;
  submap.forEach(count => total += count);

  const words = [];
  submap.forEach((count, word) => {
    words.push({ word, count });
  });
  words.sort((a, b) => b.count - a.count);

  out[key] = words.map(({ word, count }) => [ word, count ]);
});
console.log(JSON.stringify(out));
