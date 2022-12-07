const { join, sep } = require('path');
const { loadLines, sum, sort, notStartsWith } = require('../utils');

const lines = loadLines('./input.txt');
const paths = {};
let path = '';
const incSize = (current, size) => {
  paths[current] ??= 0;
  paths[current] += size;
  if (current !== sep) {
    incSize(join(current, '..'), size);
  }
};
lines.filter(x => notStartsWith(x, ['$ ls', 'dir'])).forEach((l) => {
  l.startsWith('$') ? path = join(path, l.slice(5)) : incSize(path, Number(l.split(' ')[0]));
});
const sizes = Object.values(paths);
console.log(`Part 1: ${sum(sizes.filter(x => x <= 100000))}`)
console.log(`Part 2: ${sort(sizes.filter(x => x >= paths[sep] - 40000000))[0]}`);
