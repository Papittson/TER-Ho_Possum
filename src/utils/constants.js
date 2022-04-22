const TILE_TYPES = Object.freeze({
  DIRT: { color: "#57392a", freq: 0.28, obstacle: false },
  GRASS: { color: "#57a63d", freq: 0.3, hunger: 30, obstacle: false },
  FOREST: { color: "#2e5935", freq: 0.15, hunger: 20, obstacle: false },
  ROCK: { color: "#252526", freq: 0.12, obstacle: true },
  WATER: { color: "#375e87", freq: 0.15, thirst: 50, obstacle: true },
  HOLE: { color: "#fc9e3a", sleep: 100, obstacle: false },
});

module.exports = {
  TILE_TYPES,
};
