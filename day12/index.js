const { loadLinesSplitted, map2D } = require('../utils');

const input = loadLinesSplitted('./input.txt', '');

function getValue(x, y, transformed = false) {
  const dict = {
    S: 'a',
    E: 'z',
  }
  const result = input[y] && input[y][x];
  return transformed ? dict[result] || result : result;
}

const findCells = (c) => map2D(input, (x, y) => c.includes(getValue(x, y)) ? { x, y } : undefined).filter(l => l);

function canMove(x1, y1, x2, y2) {
  const a = getValue(x1, y1, true);
  const b = getValue(x2, y2, true);
  return (!a || !b) ? false : b.charCodeAt(0) - a.charCodeAt(0) <= 1;
}

function solve(part) {
  const visited = Array.from(Array(input.length), () => Array(input[0].length).fill(false));
  const qeue = findCells(part === 2 ? ['S', 'a'] : ['S']).map(x => ({ point: x, steps: 0 }));
  const end = findCells(['E'])[0];
  while (qeue.length) {
    const { point: { x, y }, steps } = qeue.shift();
    if (x === end.x && y === end.y) {
      return steps;
    }
    if (!visited[y][x]) {
      [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach((delta) => {
        const xNew = x + delta[0];
        const yNew = y + delta[1];
        if (canMove(x, y, xNew, yNew)) {
          qeue.push({ point: { x: xNew, y: yNew }, steps: steps + 1 });
        }
        visited[y][x] = true;
      })
    }
  }
}

console.log(`Part 1: ${solve(1)}`);
console.log(`Part 2: ${solve(2)}`);
