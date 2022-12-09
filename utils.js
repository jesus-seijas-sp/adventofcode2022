const fs = require('fs');

const sort = arr => arr.sort((a, b) => a - b);
const sortDesc = arr => arr.sort((a, b) => b - a);
const sum = arr => arr.reduce((p, c) => p + c, 0);
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

module.exports = {
  sort,
  sortDesc,
  sum,
  sumFirst,
  loadTxt,
  loadLines,
  loadLinesSplitted,
  startsWith,
  notStartsWith,
  loadLinesSplittedMap,
}

