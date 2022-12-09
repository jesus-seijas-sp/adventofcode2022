const { loadLinesSplittedMap, sum } = require('../utils');

const grid = loadLinesSplittedMap('./input.txt', '', Number);
const width = grid[0].length;
const getLeft = (grid, x, y) => [...Array(x).keys()].map(cx => grid[y][cx]).reverse();
const getRight = (grid, x, y) => [...Array(width - x - 1).keys()].map(cx => grid[y][width - cx - 1]).reverse();
const getUp = (grid, x, y) => [...Array(y).keys()].map(cy => grid[cy][x]).reverse();
const getDown = (grid, x, y) => [...Array(grid.length - y - 1).keys()].map(cy => grid[grid.length - cy - 1][x]).reverse();
const cross = (grid, x, y) => [getUp(grid, x, y), getLeft(grid, x, y), getRight(grid, x, y), getDown(grid, x, y)];
const visible = (grid, x, y) => cross(grid, x, y).some(l => Math.max(...l) < grid[y][x]);
const dist = (arr, current) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] >= current) return i + 1;
  }
  return arr.length;
}
const score = (grid, x, y) => cross(grid, x, y).reduce((p, c) => p *= dist(c, grid[y][x]), 1);
const execInGrid = (grid, fn) => {
  const result = [];
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < grid.length; y += 1) {
      result.push(fn(grid, x, y));
    }
  }
  return result;
}
console.log(sum(execInGrid(grid, visible)));
console.log(Math.max(...execInGrid(grid, score)));
