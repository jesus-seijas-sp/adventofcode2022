const { loadLines } = require('../utils');

const valves = loadLines('./input.txt')
  .map((line) => /Valve (..) has flow rate=(\d+); tunnels? leads? to valves? (.*)/.exec(line).slice(1))
  .reduce((p, c) => (p[c[0]] = { id: c[0], rate: Number(c[1]), childs: c[2].split(', ') }, p), {});

const distances = Object.keys(valves).reduce((p, node) => {
  p[node] = { };
  for (let distance = 1, nodes = [...valves[node].childs]; nodes.length; distance += 1) {
    nodes = nodes.filter(n => !p[node][n]).reduce((q, n) => {
      p[node][n] = distance;
      q.push(...valves[n].childs);
      return q;
    }, []);
  }
  return p;
}, {});

const getPaths = (flows) => flows.map(x => ({ next: x, flows: flows.filter(c => c !== x) }));

function solve(start, currentFlows, minsLeft, cb) {
  const best = getPaths(currentFlows).reduce((p, { next, flows }) => {
    const t = minsLeft - distances[start][next.id] - 1;
    return t < 0 ? p : Math.max(p, next.rate * t + solve(next.id, flows, t, cb));
  }, 0);
  return cb ? cb(best, currentFlows) : best;
}

const goodValves = Object.values(valves).filter(v => v.rate);
console.log(`Part 1: ${solve('AA', goodValves, 30)}`);
console.log(`Part 2: ${solve('AA', goodValves, 26, (b, f) => Math.max(b, solve('AA', f, 26)))}`);
