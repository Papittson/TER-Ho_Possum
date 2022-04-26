const TILE_TYPES = Object.freeze({
  DIRT: { color: "#45302b", freq: 0.28, obstacle: false, growable: true },
  GRASS: {
    color: "#679629",
    freq: 0.3,
    hunger: 30,
    obstacle: false,
    growable: false,
  },
  FOREST: {
    color: "#155e2f",
    freq: 0.15,
    hunger: 20,
    obstacle: false,
    growable: false,
  },
  ROCK: { color: "#8a8a8a", freq: 0.12, obstacle: true, growable: false },
  WATER: {
    color: "#3184a8",
    freq: 0.15,
    thirst: 50,
    obstacle: true,
    growable: false,
  },
  HOLE: { color: "#000000", sleep: 100, obstacle: false, growable: false },
});

const COLORS = ["#fcba03", "#cc0000", "#b83f18", "#7a2d9c"];

const state = Object.freeze({
  hungry: "hungry",
  sleepy: "sleepy",
  thristy: "thirsty",
  normal: "normal",
});

const criticalLevels = Object.freeze({
  hunger: 30,
  sleep: 20,
  thrist: 35,
});

module.exports = {
  TILE_TYPES,
  state,
  criticalLevels,
  COLORS,
};
