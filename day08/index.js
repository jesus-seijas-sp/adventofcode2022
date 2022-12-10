const { loadLinesSplittedMap, sum, mul, range, map2D } = require('../utils');

const grid = loadLinesSplittedMap('./input.txt', '', Number);
const width = grid[0].length;
const getLeft = (x, y) => range(x).map(cx => grid[y][cx]).reverse();
const getRight = (x, y) => range(width - x - 1).map(cx => grid[y][width - cx - 1]).reverse();
const getUp = (x, y) => range(y).map(cy => grid[cy][x]).reverse();
const getDown = (x, y) => range(grid.length - y -1).map(cy => grid[grid.length - cy - 1][x]).reverse();
const cross = (x, y) => [getUp(x, y), getLeft(x, y), getRight(x, y), getDown(x, y)];
const visible = (x, y) => cross(x, y).some(l => Math.max(...l) < grid[y][x]);
const dist = (arr, current) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] >= current) return i + 1;
  }
  return arr.length;
}
const score = (x, y) => mul(cross(x, y).map(c => dist(c, grid[y][x])));
console.log(`Part 1: ${sum(map2D(grid, visible))}`);
console.log(`Part 2: ${Math.max(...map2D(grid, score))}`);
