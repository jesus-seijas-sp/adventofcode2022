const { loadLinesSplitted } = require('../utils');

const lines = loadLinesSplitted('./input.txt');
const scores1 = {
  A: { X: 3 + 1, Y: 6 + 2, Z: 0 + 3 },
  B: { X: 0 + 1, Y: 3 + 2, Z: 6 + 3 },
  C: { X: 6 + 1, Y: 0 + 2, Z: 3 + 3 },
}
const score1 = lines.reduce((p, c) => p + scores1[c[0]][c[1]], 0);
console.log(`Part 1: ${score1}`);

const scores2 = {
  A: { X: 0 + 3, Y: 3 + 1, Z: 6 + 2 },
  B: { X: 0 + 1, Y: 3 + 2, Z: 6 + 3 },
  C: { X: 0 + 2, Y: 3 + 3, Z: 6 + 1 },
}

const score2 = lines.reduce((p, c) => p + scores2[c[0]][c[1]], 0);
console.log(`Part 2: ${score2}`);
