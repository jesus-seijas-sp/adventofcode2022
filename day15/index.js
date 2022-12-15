const { loadLines } = require('../utils');

const exp = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
const lines = loadLines('./input.txt')
  .map((line) => exp.exec(line).slice(1).map(Number))
  .map((line) => ({ sx: line[0], sy: line[1], bx: line[2], by: line[3] }));

const distance = (x0, y0, x1, y1) => Math.abs(x0 - x1) + Math.abs(y0 - y1);
const impossible = new Set();
const beacons = new Set();
const sensors = [];
lines.forEach(({ sx, sy, bx, by }) => {
  const d = distance(sx, sy, bx, by);
  sensors.push({ sx, sy, d });
  const width = d - Math.abs(sy - 2000000);
  for (let i = sx - width; i <= sx + width; i += 1) {
    impossible.add(i);
  }
  if (by === 2000000) {
    beacons.add(bx);
  }
});

const SIZE = 4000000;
const clamp = (x) => Math.min(Math.max(x, 0), SIZE);
const getCoverages = (y) => sensors
  .map(({ sx, sy, d }) => {
    const width = d - Math.abs(sy - y);
    return width > 0 ? ({ start: clamp(sx - width), end: clamp(sx + width) }) : undefined;
  })
  .filter(x => x)
  .sort((a, b) => a.start - b.start);

function findGap(coverages) {
  let lastX = -1;
  for (let i = 0; i < coverages.length; i += 1) {
    if (lastX + 1 < coverages[i].start) {
      return lastX + 1;
    }
    lastX = Math.max(coverages[i].end, lastX);
  }
  return -1;
}

console.log(`Part 1: ${impossible.size - beacons.size}`);
for (let y = 0; y <= SIZE; y += 1) {
  const coverages = getCoverages(y);
  const gap = findGap(coverages);
  if (gap > -1) {
    console.log(`Part 2: ${gap * SIZE + y}`);
    break;
  }
} 
