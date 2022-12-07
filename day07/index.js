const { join, sep } = require('path');
const { loadLines, sum, sort } = require('../utils');

const lines = loadLines('./input.txt');
const paths = {};
let currentPath = '';
const incSize = (current, size) => {
  paths[current] += size;
  if (current !== sep) {
    incSize(join(current, '..'), size);
  }
};
lines.forEach((line) => {
  if (line.startsWith('$ cd')) {
    currentPath = join(currentPath, line.slice(5));
    paths[currentPath] ??= 0;
  } else if (!line.startsWith('$') && !line.startsWith('dir')) {
    incSize(currentPath, parseInt(line.split(' ')[0]));
  }
});
const sizes = Object.values(paths);
console.log(`Part 1: ${sum(sizes.filter(x => x <= 100000))}`)
const minValue = paths[sep] - 40000000;
console.log(`Part 2: ${sort(sizes.filter(x => x >= minValue))[0]}`);
