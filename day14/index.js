const { loadLinesSplittedMap } = require('../utils');

const input = loadLinesSplittedMap('input.txt', ' -> ', (point) => {
  const [strx, stry] = point.split(',');
  return { x: Number(strx), y: Number(stry) };
});

const startX = 500;
const maxY = Math.max(...input.flat().map(point => point.y));
const minX = startX - maxY - 2;

const getXLine = (c) => Array(2 * maxY + 5).fill(c);

function buildGrid(part) {
  const grid = Array.from(Array(maxY + 1), () => getXLine('.'));
  input.forEach(line => {
    for (let i = 1; i < line.length; i += 1) {
      const [{ x: fromX, y: fromY }, { x: toX, y: toY }] = [line[i - 1], line[i]];
      if (fromY !== toY) {
        for (let y = Math.min(fromY, toY); y <= Math.max(fromY, toY); y += 1) {
          grid[y][fromX - minX] = '#';
        }
      } else {
        for (let x = Math.min(fromX, toX); x <= Math.max(fromX, toX); x += 1) {
          grid[fromY][x - minX] = '#';
        }
      }
    }
  });
  if (part === 2) {
    grid.push(getXLine('.'), getXLine('#'));
  }
  return grid;
}

const dropSand = (grid, x, y, part) => {
  if (!(part === 1 && y === maxY) && !(part === 2 && grid[0][startX - minX] === 'o')) {
    const dx = [0, -1, 1].filter(dx => grid[y + 1][x - minX + dx] === '.')[0];
    return dx !== undefined ? dropSand(grid, x + dx, y + 1, part) : grid[y][x - minX] = 'o';
  }
}

const solve = (part) => {
  const grid = buildGrid(part);
  let result = 0;
  while (dropSand(grid, startX, 0, part)) {
    result += 1;
  }
  return result;
}

console.log(`Part 1: ${solve(1)}`);
console.log(`Part 2: ${solve(2)}`);