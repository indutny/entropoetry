'use strict';

const fs = require('fs');

const lines = fs.readFileSync(process.argv[2]).toString()
    .split('\n').map(x => x.trim()).filter(x => x)
    // Remove commented lines
    .filter(x => !/^;;;/.test(x))
    // Remove funny words starting with `'`
    .filter(x => !/^'/.test(x))
    // Remove special characters and alternative pronunciation
    .filter(x => !/["#%&()+,\-\.\/;:\?!{}]/.test(x));

const map = new Map();

function id(sound) {
  if (map.has(sound))
    return map.get(sound);

  const res = map.size;
  map.set(sound, map.size);
  return res;
}

function Word(word, sounds) {
  this.word = word;
  this.sounds = sounds.map((s) => {
    const isVowel = /[012]$/.test(s);
    if (isVowel) {
      return {
        type: 'vowel',
        sound: id(s.slice(0, -1)),
        stress: s.slice(-1) | 0
      };
    }
    return { type: 'consonant', sound: id(s) };
  });

  this.stress = this.sounds.filter(x => x.type === 'vowel')
                           .map(x => x.stress);

  this.rhyme = [];
  for (let i = this.sounds.length - 1; i >= 0; i--) {
    const sound = this.sounds[i];
    this.rhyme.push(sound);
    if (sound.type === 'vowel')
      break;
  }
}

Word.prototype.toJSON = function toJSON() {
  function sound(s) {
    if (s.type === 'vowel')
      return [ s.sound, s.stress ];
    else
      return [ s.sound ];
  }

  return [ this.sounds.map(sound), this.stress,
           this.rhyme.map(({ sound }) => sound) ];
};

const out = {};

lines.forEach((line) => {
  const parts = line.toLowerCase().split(/\s+/g);

  out[parts[0]] = new Word(parts[0], parts.slice(1));
});

console.log(JSON.stringify(out));
