const { loadLinesSplitted } = require('../utils');

const input = loadLinesSplitted('./input.txt').map(line => ({ dir: line[0], num: Number(line[1])}));
const cmds = {
  R: (knots) => knots[0][0] += 1,
  L: (knots) => knots[0][0] -= 1,
  U: (knots) => knots[0][1] += 1,
  D: (knots) => knots[0][1] -= 1,
}

function updateTails(knots, moves) {
  for (let i = 1; i < knots.length; i += 1) {
    const dx = knots[i - 1][0] - knots[i][0];
    const dy = knots[i - 1][1] - knots[i][1];
    if (Math.abs(dx) >= 2 || Math.abs(dy) >= 2) {
      knots[i][0] += Math.sign(dx);
      knots[i][1] += Math.sign(dy);
    }
    if (i === knots.length - 1) {
      moves.add(knots[i].join('-'));
    }
  }
}

function exec(numKnots = 2) {
  const knots = [];
  for (let i = 0; i < numKnots; i += 1) {
    knots.push([0, 0]);
  }
  const result = new Set();
  input.forEach(({dir, num}) => {
    for (let i = 0; i < num; i += 1) {
      cmds[dir](knots);
      updateTails(knots, result);
    }
  });
  return result.size;
}

console.log(`Part 1: ${exec(2)}`);
console.log(`Part 2: ${exec(10)}`);
