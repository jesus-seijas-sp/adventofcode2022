const { loadLines, sortDesc, sumFirst } = require('../utils');

const input = loadLines('./input.txt');

const calories = input.reduce((p, c) => (c ? p[p.length - 1] += parseInt(c) : p.push(0), p), [0]);
sortDesc(calories);
console.log(`Part 1: ${calories[0]}`);
console.log(`Part 2: ${sumFirst(calories, 3)}`);