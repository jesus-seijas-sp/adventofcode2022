const { loadLines, sum } = require('../utils');

function mix(input, times = 1) {
  const result = [...input];
  for (let i = 0; i < times; i++) {
    input.forEach(n => {
      const i = result.indexOf(n);
      result.splice(i, 1);
      result.splice((i + n.x) % result.length, 0, n);
    });
  }
  return result;
}

const input = loadLines('./input.txt').map(x => ({ x: Number(x) }));
const sum3 = (l, z = l.findIndex(e => !e.x)) => sum([1000, 2000, 3000].map(x => l[(z + x) % l.length].x));
console.info(`Part 1: ${sum3(mix(input))}`);
console.info(`Part 2: ${sum3(mix(input.map(n => ({ x: n.x * 811589153 })), 10))}`);
