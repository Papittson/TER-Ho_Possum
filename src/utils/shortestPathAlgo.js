/**
 * Find a path from an entity to a specific goal.
 * @param {(Creature | Predator)} entity - Entity where the path goes from.
 * @param {(string | TILE_TYPES[])} goal - Goal to find (tile id/types or "creature").
 * @param {Map<string, Tile>} tiles - Tiles to find from.
 * @param {Creature[]} [creatures] - Creatures to find from (optional).
 * @returns {string[]} Array of tile ids.
 */
function findPath(entity, goal, tiles, creatures) {
  const tilesExplored = new Map();
  const tilesToExplore = new Map().set(`${entity.x};${entity.y}`, null);
  const isTarget =
    typeof goal === "string"
      ? goal == "creature"
        ? (tileId) =>
            creatures.some(
              (creature) =>
                creature.x == tiles.get(tileId).x &&
                creature.y == tiles.get(tileId).y
            )
        : (tileId) => tileId == goal
      : (tileId) => goal.includes(tiles.get(tileId).type);

  return shortestPath(tilesExplored, tilesToExplore, isTarget, tiles);
}

/**
 * Shortest path algorithm.
 * @param {Map<string, Tile>} tilesExplored - Tiles explored during search.
 * @param {Map<string, Tile>} tilesToExplore - Tiles to explore during search.
 * @param {Function} isTarget - Function that returns true if target is found.
 * @param {Map<string, Tile>} tiles - Tiles to find from.
 * @returns {string[]} Array of tile ids.
 */
function shortestPath(tilesExplored, tilesToExplore, isTarget, tiles) {
  while (tilesToExplore.size > 0) {
    const tileId = Array.from(tilesToExplore.keys(tilesToExplore))[0];
    tilesExplored.set(tileId, tilesToExplore.get(tileId));
    tilesToExplore.delete(tileId);

    if (isTarget(tileId)) {
      const path = [];
      let key = tileId;
      while (key != null) {
        path.unshift(key);
        key = tilesExplored.get(key);
      }
      return path;
    }

    const neighbours = tiles.get(tileId).neighbours(tiles);
    for (let i = 0; i < neighbours.length; i++) {
      if (
        tilesExplored.has(neighbours[i].id) ||
        tilesToExplore.has(neighbours[i].id) ||
        neighbours[i].isObstacle()
      ) {
        continue;
      } else {
        tilesToExplore.set(neighbours[i].id, tileId);
      }
    }
  }

  return [];
}

module.exports = findPath;
