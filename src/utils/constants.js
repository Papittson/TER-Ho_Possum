const TILE_TYPES = Object.freeze({
  DIRT: {
    color: "#45302b",
    freq: 0.28,
    images: ["./images/DIRT01.png"],
  },
  GRASS: {
    name: "HERBE",
    color: "#679629",
    freq: 0.35,
    HUNGER: 30,
    images: ["./images/GRASS01.png", "./images/GRASS02.png"],
  },
  FOREST: {
    name: "FORET",
    color: "#155e2f",
    freq: 0.22,
    HUNGER: 20,
    images: ["./images/FOREST01.png"],
  },
  ROCK: {
    name: "ROCHER",
    color: "#8a8a8a",
    freq: 0.12,
    images: ["./images/ROCK01.png"],
  },
  WATER: {
    name: "EAU",
    color: "#3184a8",
    freq: 0.08,
    images: ["./images/WATER01.png"],
  },
  SAND: {
    name: "SABLE",
    color: "#ebd9ab",
    THIRST: 50,
    images: ["./images/SAND01.png"],
  },
  HOLE: {
    name: "TERRIER",
    color: "#000000",
    SLEEP: 100,
    obstacle: false,
    growable: false,
    images: ["./images/HOLE01.png"],
  },
});

const COLORS = ["#fcba03", "#cc0000", "#b83f18", "#7a2d9c"];

const NEEDS = Object.freeze({
  HUNGER: {
    default: 100,
    decreaseAmount: 5,
    critical: 30,
    priority: 50,
  },
  THIRST: {
    default: 100,
    decreaseAmount: 5,
    critical: 35,
    priority: 100,
  },
  SLEEP: {
    default: 100,
    decreaseAmount: 5,
    critical: 20,
    priority: 20,
  },
});

module.exports = {
  TILE_TYPES,
  COLORS,
  NEEDS,
};
