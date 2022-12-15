const { loadLines } = require('../utils');

const exp = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
const distance = ([x0, y0, x1, y1]) => Math.abs(x0 - x1) + Math.abs(y0 - y1);
const sensors = loadLines('./input.txt')
  .map((line) => exp.exec(line).slice(1).map(Number))
  .map((line) => ({ sx: line[0], sy: line[1], bx: line[2], by: line[3], d: distance(line) }));

const impossible = new Set();
sensors.forEach(({ sx, sy, bx, by, d }) => {
  const width = d - Math.abs(sy - 2000000);
  for (let i = sx - width; i <= sx + width; i += 1) {
    if (by !== 2000000 || bx !== i) {
      impossible.add(i);
    }
  }
});
console.log(`Part 1: ${impossible.size}`);

const SIZE = 4000000;
const clamp = (x) => Math.min(Math.max(x, 0), SIZE);
const getCoverages = (y) => sensors
  .map(({ sx, sy, d }) => {
    const width = d - Math.abs(sy - y);
    return width > 0 ? [clamp(sx - width), clamp(sx + width)] : undefined;
  })
  .filter(x => x)
  .sort((a, b) => a[0] - b[0]);

function findGapAtY(y) {
  const coverages = getCoverages(y);
  let last = -1;
  for (let i = 0; i < coverages.length; i += 1) {
    if (last + 1 < coverages[i][0]) {
      return last + 1;
    }
    last = Math.max(coverages[i][1], last);
  }
}

const findGap = () => {
  for (let y = 0; y <= SIZE; y += 1) {
    const gap = findGapAtY(y);
    if (gap) {
      return gap * SIZE + y;
    }
  } 
} 

console.log(`Part 2: ${findGap()}`);