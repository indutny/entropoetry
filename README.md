# entropoetry

**WORK IN PROGRESS**

Entropic Poet can write an unique poem based on a binary data. Not only this,
but the Poet can also reconstruct the binary data given the poem.

## Usage

```js
const Poet = require('entropoetry');

const p = new Poet();

const key = Buffer.from(
    '9d7ca59459c65b79c39bd2c75e831e09542abebe7a2054efde2d19072bdbe0a4',
    'hex');

console.log(p.stringify(key));
/*
hair had not too great hole
of course and pride they roll
he rattled but shook foil
i bear my soul the toil
he me why else should ills
was not my hundred hills
to fly up from a fate
had some great
*/
console.log(p.parse(`
  hair had not too great hole
  of course and pride they roll
  he rattled but shook foil
  i bear my soul the toil
  he me why else should ills
  was not my hundred hills
  to fly up from a fate
  had some great
`));
```

## LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2017.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.

[0]: https://en.wikipedia.org/wiki/EdDSA#Ed25519
