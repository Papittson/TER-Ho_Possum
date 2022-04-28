const TILE_TYPES = Object.freeze({
  DIRT: { color: "#45302b", freq: 0.28 },
  GRASS: {
    color: "#679629",
    freq: 0.3,
    hunger: 30,
  },
  FOREST: {
    color: "#155e2f",
    freq: 0.15,
    hunger: 20,
  },
  ROCK: { color: "#8a8a8a", freq: 0.12 },
  WATER: {
    color: "#3184a8",
    freq: 0.15,
    thirst: 50,
  },
  HOLE: { color: "#000000", sleep: 100, obstacle: false, growable: false },
});

const COLORS = ["#fcba03", "#cc0000", "#b83f18", "#7a2d9c"];

const NEEDS = Object.freeze({
  HUNGER: {
    default: 50,
    decreaseAmount: 0.2,
    critical: 30,
    priority: 50,
  },
  THIRST: {
    default: 50,
    decreaseAmount: 0.25,
    critical: 35,
    priority: 100,
  },
  SLEEP: {
    default: 50,
    decreaseAmount: 0.2,
    critical: 20,
    priority: 20,
  },
});

module.exports = {
  TILE_TYPES,
  COLORS,
  NEEDS,
};
