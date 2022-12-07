const { join } = require('path');
const { loadLines, sum, sort } = require('../utils');

const lines = loadLines('./input.txt');
const paths = {};
let currentPath = '';
const root = join('/', '');

const incSize = (current, size) => {
  paths[current] += size;
  if (current !== root) {
    incSize(join(current, '..'), size);
  }
};

lines.forEach((line) => {
  if (line.startsWith('$ cd')) {
    currentPath = join(currentPath, line.slice(5));
    if (!paths[currentPath]) {
      paths[currentPath] = 0;
    }
  } else if (!line.startsWith('$') && !line.startsWith('dir')) {
    const size = parseInt(line.split(' ')[0]);
    incSize(currentPath, size);
  }
});
const sizes = Object.values(paths);
console.log(`Part 1: ${sum(sizes.filter(x => x <= 100000))}`)
const minValue = paths[root] - 40000000;
console.log(`Part 2: ${sort(sizes.filter(x => x >= minValue))[0]}`);
