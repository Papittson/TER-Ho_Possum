// When you call this function, you can either pass a targetId (String) OR a targetType (TILE_TYPES)
function findPath(tilesExplored, tilesToExplore, tiles, targetId, targetType) {
  let stopCondition;
  if (targetId != null) {
    stopCondition = (tileId) => tileId == targetId;
    if (tiles.get(targetId).isObstacle()) {
      console.error("The target tile is an obstacle...");
      return [];
    }
  } else if (targetType != null) {
    stopCondition = (tileId) => tiles.get(tileId).type == targetType;
  } else {
    throw new Error("You must put a target !");
  }

  while (tilesToExplore.size > 0) {
    const tileId = Array.from(tilesToExplore.keys(tilesToExplore))[0];
    tilesExplored.set(tileId, tilesToExplore.get(tileId));
    tilesToExplore.delete(tileId);

    if (stopCondition(tileId)) {
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
