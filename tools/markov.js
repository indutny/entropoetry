'use strict';

const fs = require('fs');

const dict = JSON.parse(fs.readFileSync(process.argv[2]).toString());
const lines = fs.readFileSync(process.argv[3]).toString()
    .split('\n').map(x => x.trim()).filter(x => x);

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

uniqueLines.forEach((line) => {
  const words = line.split(/\s+/g);

  const allKnown = words.every(word => dict.hasOwnProperty(word));
  if (!allKnown)
    return;

  let prev = '';
  words.reverse().forEach((word) => {
    // Filter out empty words
    if (!word)
      return;

    let submap;
    if (map.has(prev)) {
      submap = map.get(prev);
    } else {
      submap = new Map();
      map.set(prev, submap);
    }
    if (submap.has(word))
      submap.set(word, submap.get(word) + 1);
    else
      submap.set(word, 1);
    prev = word;
  });
});

const out = {};
map.forEach((submap, key) => {
  let total = 0;
  submap.forEach(count => total += count);

  const words = [];
  submap.forEach((count, word) => {
    words.push({ word, probability: count / total });
  });
  words.sort((a, b) => b.probability - a.probability);

  out[key] = words.map(({ word, probability }) => [ word, probability ]);
});
console.log(JSON.stringify(out));
