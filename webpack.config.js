'use strict';

const path = require('path');

const DIST = path.join(__dirname, 'dist');
const LIB = path.join(__dirname, 'lib');

const loaders = [
  { test: /\.js$/, loader: 'babel-loader', options: { presets: [ 'es2015' ] } }
];

module.exports = [{
  entry: path.join(LIB, 'ui.js'),
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    loaders: loaders
  }
}, {
  entry: path.join(LIB, 'worker.js'),
  output: {
    path: DIST,
    filename: 'worker.js'
  },
  module: {
    loaders: loaders
  }
}];
