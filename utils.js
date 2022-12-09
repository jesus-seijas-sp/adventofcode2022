const fs = require('fs');

const sort = arr => arr.sort((a, b) => a - b);
const sortDesc = arr => arr.sort((a, b) => b - a);
const sum = arr => arr.reduce((p, c) => p + c, 0);
const mul = arr => arr.reduce((p, c) => p *= c, 1);
const sumFirst = (arr, n) => sum(arr.slice(0, n));
const loadTxt = fileName => fs.readFileSync(fileName, 'utf-8');
const loadLines = fileName => loadTxt(fileName).split(/\r?\n/);
const loadLinesSplitted = (fileName, char = ' ') => loadLines(fileName).map(line => line.split(char));
const loadLinesSplittedMap = (fileName, char = ' ', fn) => loadLines(fileName).map(line => line.split(char).map(fn));
const startsWith = (str, subs) => {
  subs = Array.isArray(subs) ? subs : [subs];
  return subs.some(x => str.startsWith(x));
}
const notStartsWith = (str, subs) => !startsWith(str, subs);
const range = (x) => [...Array(x).keys()];
const rangeMap = (x, fn) => range(x).map(fn);
const map2D = (grid, fn) => {
  const result = [];
  for (let y = 0, height = grid.length; y < height; y += 1) {
    for (let x = 0, width = grid[y].length; x < width; x += 1) {
      result.push(fn(x, y, grid[y][x], grid))
    }
  }
  return result;  
}

module.exports = {
  sort,
  sortDesc,
  sum,
  mul,
  sumFirst,
  loadTxt,
  loadLines,
  loadLinesSplitted,
  startsWith,
  notStartsWith,
  loadLinesSplittedMap,
  range,
  rangeMap,
  map2D,
}

