//il faut lier les cases à leur parent, récuperer le chemin le plus court

// eslint-disable-next-line no-unused-vars
function path(tilesExplored, tilesToExplore, targetedTile, tiles) {
  while (Object.keys(tilesToExplore).length > 0) {
    const tile = Object.keys(tilesToExplore)[0];
    tilesExplored[tile] = tilesToExplore[tile];
    delete tilesToExplore[tile];

    const neighbours = tiles.get(tile).neighbours(tiles);
    for (let i = 0; i < neighbours.length; i++) {
      if (
        neighbours[i].id in tilesExplored ||
        neighbours[i].id in tilesToExplore ||
        neighbours[i].isObstacle()
      ) {
        continue;
      } else {
        tilesToExplore[neighbours[i].id] = tile;
      }
    }
    if (tile == targetedTile) {
      return tilesExplored;
    }
  }
  return [];
}
module.exports = path;
