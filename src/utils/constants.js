const SETTINGS = Object.freeze({
  MAX_PLAYERS: 4,
  MAX_POINTS: 15,
  MAX_NEED: 5,
});

const PREDATOR_SETTINGS = Object.freeze({
  PERCEPTION: 3,
  MOVE_SPEED: 3,
  STRENGTH: 9,
  IMG: "./images/PREDATOR.png",
});

const NEEDS = Object.freeze({
  HUNGER: {
    default: 100,
    decreaseAmount: 3,
    critical: 40,
    priority: 50,
  },
  THIRST: {
    default: 100,
    decreaseAmount: 5,
    critical: 50,
    priority: 100,
  },
  SLEEP: {
    default: 100,
    decreaseAmount: 4,
    critical: 20,
    priority: 20,
  },
  MATING: {
    default: 15,
    decreaseAmount: 1,
    critical: 1,
    priority: 10,
  },
});

const TILE_TYPES = Object.freeze({
  DIRT: {
    freq: 0.28,
    images: ["./images/DIRT01.png"],
  },
  GRASS: {
    freq: 0.35,
    HUNGER: 30,
    images: ["./images/GRASS01.png", "./images/GRASS02.png"],
  },
  FOREST: {
    freq: 0.22,
    HUNGER: 12,
    images: ["./images/FOREST01.png"],
  },
  ROCK: {
    freq: 0.08,
    images: ["./images/ROCK01.png"],
  },
  WATER: {
    freq: 0.03,
    images: ["./images/WATER01.png"],
  },
  SAND: {
    THIRST: 50,
    images: ["./images/SAND01.png"],
  },
  HOLE: {
    SLEEP: 100,
    MATING: NEEDS.MATING.default,
    images: [],
  },
});

module.exports = {
  PREDATOR_SETTINGS,
  TILE_TYPES,
  NEEDS,
  SETTINGS,
};
