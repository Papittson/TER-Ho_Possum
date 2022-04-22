const TILE_TYPES = Object.freeze({
  DIRT: { color: "#57392a", freq: 0.28 },
  GRASS: { color: "#57a63d", freq: 0.3, hunger: 30 },
  FOREST: { color: "#2e5935", freq: 0.15, hunger: 20 },
  ROCK: { color: "#252526", freq: 0.12 },
  WATER: { color: "#375e87", freq: 0.15, thirst: 50 },
  HOLE: { color: "#fc9e3a", sleep: 100 },
});

module.exports = {
  TILE_TYPES,
};
