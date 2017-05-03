# entropoetry

Entropic Poet can write an unique poem based on a binary data. Not only this,
but the Poet can also reconstruct the binary data given the poem.

## Usage

```js
const Poet = require('entropoetry');

const p = new Poet();

const key = Buffer.from(
    '1cd543bb7110a3a2ec49cbe0eb321232622f6b3d2abaec57466bae0b4085c9f8',
    'hex');

console.log(p.stringify(key));
/*
    book what she's slyly smiled
    on our song is styled
    without art far they bit
    own front of which blasts fit
    mute though one who speaks peace
    his hired man in greece
    be sweet child it be called
    mind recalled
*/

console.log(p.parse(`
    book what she's slyly smiled
    on our song is styled
    without art far they bit
    own front of which blasts fit
    mute though one who speaks peace
    his hired man in greece
    be sweet child it be called
    mind recalled
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
