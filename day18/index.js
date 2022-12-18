const { loadLinesSplittedMap } = require('../utils');

const ax =[0, 1, 2];
const cubes = loadLinesSplittedMap('./input.txt', ',', Number);
const eq = (a, b, i) => ax.every(x => (x !== i && a[x] === b[x]) || (x === i && Math.abs(a[x] - b[x]) === 1));
const part1 = () => cubes.reduce((p, c) => p + cubes.reduce((q, d) => q - ax.some(x => eq(c, d, x)), 0), cubes.length * 6);

function part2() {
  const ext = ax.map(x => [Math.min(...cubes.map(c => c[x])) - 1, Math.max(...cubes.map(c => c[x])) + 1]);
  const q = [[ext[0][0], ext[1][0], ext[2][0]]];
  const dict = {};
  let result = 0;
  while (q.length) {
    const current = q.shift();
    if (!dict[current.join(',')]) {
      dict[current.join(',')] = 1;
      if (ax.every(axis => ext[axis][0] <= current[axis] && ext[axis][1] >= current[axis])) {
        [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].forEach(dir => {
          const nc = [current[0] + dir[0], current[1] + dir[1], current[2] + dir[2]];
          cubes.some((cube) => eq(cube, nc)) ? result += 1 : q.push(nc);
        });
      }
    }
  }
  return result;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
