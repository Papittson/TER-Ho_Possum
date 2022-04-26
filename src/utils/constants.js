const TILE_TYPES = Object.freeze({
  DIRT: { color: "#45302b", freq: 0.28, obstacle: false },
  GRASS: { color: "#679629", freq: 0.3, hunger: 30, obstacle: false },
  FOREST: { color: "#155e2f", freq: 0.15, hunger: 20, obstacle: false },
  ROCK: { color: "#8a8a8a", freq: 0.12, obstacle: true },
  WATER: { color: "#3184a8", freq: 0.15, thirst: 50, obstacle: true },
  HOLE: { color: "#b83f18", sleep: 100, obstacle: false },
  CHEMIN: { color: "#ff0000" },
  DEPART: { color: "#00ff00" },
  ARRIVEE: { color: "#0000ff" },
});

// eslint-disable-next-line no-unused-vars
const state = Object.freeze({
  hungry: "hungry",
  sleepy: "sleepy",
  thristy: "thirsty",
  normal: "normal",
});

// eslint-disable-next-line no-unused-vars
const criticalLevels = Object.freeze({
  hunger: 30,
  sleep: 20,
  thrist: 35,
});

module.exports = {
  TILE_TYPES,
  state,
  criticalLevels,
};
