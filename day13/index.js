const { loadLines, sum } = require('../utils');

const input = loadLines('./input.txt').filter(x => x).map(x => JSON.parse(x));

const compare = (a, b) => {
  if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      for (let i = 0; i < a.length; i += 1) {
        if (b[i] === undefined) {
          return 1;
        }
        const comp = compare(a[i], b[i]);
        if (comp) {
          return comp;
        }
      }
      return a.length < b.length ? -1 : 0;
    }
    return compare(a, [b]);
  }
  if (Array.isArray(b)) {
    return compare([a], b);
  }
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

const indexs = [];
for (let i = 0; i < input.length / 2; i += 1) {
  const a = input[i * 2];
  const b = input[i * 2 + 1];
  if (compare(a, b) <= 0) {
    indexs.push(i + 1);
  }
}
console.log(`Part 1: ${sum(indexs)}`);

const a = [[2]];
const b = [[6]];
input.push(a, b);
const sorted = input.sort(compare);
console.log(`Part 2: ${(sorted.indexOf(a) + 1) * (sorted.indexOf(b) + 1)}`);
