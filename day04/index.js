const { loadLinesSplitted } = require('../utils');

const groups = loadLinesSplitted('./input.txt', ',').map(([a, b]) => [a.split('-').map(Number), b.split('-').map(Number)]);
const isContained = (a, b) => a[0] <= b[0] && a[1] >= b[1] || b[0] <= a[0] && b[1] >= a[1];
console.log(`Part 1: ${groups.filter(([a, b]) => isContained(a, b)).length}`);
const isOverlapped = (a, b) => a[0] <= b[1] && a[1] >= b[0];
console.log(`Part 2: ${groups.filter(([a, b]) => isOverlapped(a, b)).length}`);

