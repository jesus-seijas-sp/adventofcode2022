const fs = require('fs');

const sort = arr => arr.sort((a, b) => a - b);
const sortDesc = arr => arr.sort((a, b) => b - a);
const sum = arr => arr.reduce((p, c) => p + c, 0);
const sumFirst = (arr, n) => sum(arr.slice(0, n));
const loadTxt = fileName => fs.readFileSync(fileName, 'utf-8');
const loadLines = fileName => fs.readFileSync(fileName, 'utf-8').split(/\r?\n/);


module.exports = {
  sort,
  sortDesc,
  sum,
  sumFirst,
  loadTxt,
  loadLines,
}

