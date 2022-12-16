const { loadLines } = require('../utils');

const exp = /Valve (..) has flow rate=(.*); tunnels? leads? to valves? (.*)/;
const valves = loadLines('./input.txt')
  .map((line) => exp.exec(line).slice(1))
  .reduce((p, c) => {
    p[c[0]] = {
      name: c[0],
      rate: Number(c[1]),
      childs: c[2].split(', '),
    }
    return p;
  }, {});

const distances = Object.keys(valves).reduce((p, node) => {
    p[node] = {};
    let nodes = [node];
    let distance = 0
    while (nodes.length > 0) {
      const nextNodes = [];
      nodes.forEach(n => {
        if (p[node][n] === undefined) {
          p[node][n] = distance;
          nextNodes.push(...valves[n].childs);
        }
      })
      nodes = nextNodes;
      distance += 1;
    }
  return p;
}, {});

const getPaths = (flows) => flows.map(x => ({ next: x, flows: flows.filter(c => c !== x) }));

function solve(start, currentFlows, minsLeft, cb) {
  const best = getPaths(currentFlows).reduce((p, { next, flows }) => {
    const t = minsLeft - distances[start][next.name] - 1;
    return t < 0 ? p : Math.max(p, next.rate * t + solve(next.name, flows, t, cb));
  }, 0);
  return cb ? cb(best, currentFlows) : best;
}

const goodValves = Object.values(valves).filter(v => v.rate);
console.log(solve('AA', goodValves , 30));
console.log(solve('AA', goodValves, 26, (b, f) => Math.max(b, solve('AA', f, 26))));
