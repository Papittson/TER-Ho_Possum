const TILE_TYPES = Object.freeze({
  DIRT: { color: "#45302b", freq: 0.28 },
  GRASS: {
    name: "HERBE",
    color: "#679629",
    freq: 0.35,
    HUNGER: 30,
  },
  FOREST: {
    name: "FORET",
    color: "#155e2f",
    freq: 0.22,
    HUNGER: 20,
  },
  ROCK: { name: "ROCHER", color: "#8a8a8a", freq: 0.1 },
  WATER: {
    name: "EAU",
    color: "#3184a8",
    freq: 0.05,
  },
  SAND: {
    name: "SABLE",
    color: "#ebd9ab",
    THIRST: 50,
  },
  HOLE: {
    name: "TERRIER",
    color: "#000000",
    SLEEP: 100,
    obstacle: false,
    growable: false,
  },
});

const COLORS = ["#fcba03", "#cc0000", "#b83f18", "#7a2d9c"];

const NEEDS = Object.freeze({
  HUNGER: {
    default: 50,
    decreaseAmount: 10,
    critical: 30,
    priority: 50,
  },
  THIRST: {
    default: 50,
    decreaseAmount: 10,
    critical: 35,
    priority: 100,
  },
  SLEEP: {
    default: 50,
    decreaseAmount: 10,
    critical: 20,
    priority: 20,
  },
});

module.exports = {
  TILE_TYPES,
  COLORS,
  NEEDS,
};
