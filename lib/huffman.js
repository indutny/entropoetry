'use strict';

const assert = require('assert');

function Leaf(prob, value) {
  this.prob = prob;
  this.value = value;
}

function Node(left, right) {
  this.prob = left.prob + right.prob;
  this.left = left;
  this.right = right;
}


module.exports = function generate(list) {
  const leafQueue = [];

  // `list` should be sorted by probability
  for (let i = 0; i < list.length; i++) {
    const word = list[i][0];
    const prob = list[i][1];

    leafQueue.push(new Leaf(prob, word));
  }

  const nodeQueue = [];
  while ((leafQueue.length + nodeQueue.length) > 1) {
    const leafs = [];
    while (leafs.length < 2 && leafQueue.length > 1 && nodeQueue.length > 1) {
      const lastQ = leafQueue[leafQueue.length - 1];
      const lastN = nodeQueue[nodeQueue.length - 1];

      if (lastQ.prob < lastN.prob)
        leafs.push(leafQueue.pop());
      else
        leafs.push(nodeQueue.pop());
    }
    while (leafs.length < 2 && leafQueue.length !== 0)
      leafs.push(leafQueue.pop());
    while (leafs.length < 2 && nodeQueue.length !== 0)
      leafs.push(nodeQueue.pop());

    const node = new Node(leafs[0], leafs[1]);
    nodeQueue.unshift(node);
  }

  const root = nodeQueue.pop();

  function tree(node) {
    if (node instanceof Leaf)
      return node.value;

    return [ tree(node.left), tree(node.right) ];
  }

  const backward = new Map();
  function createBackward(node, path) {
    if (node instanceof Leaf)
      return backward.set(node.value, path);

    createBackward(node.left, path.concat(0));
    createBackward(node.right, path.concat(1));
  }
  createBackward(root, []);

  return {
    forward: tree(root),
    backward
  };
};
