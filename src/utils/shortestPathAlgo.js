//il faut lier les cases à leur parent, récuperer le chemin le plus court

// eslint-disable-next-line no-unused-vars
function path(tilesExplored, tilesToExplore, targetedTile, tiles) {
  if (!tiles.get(targetedTile).isObstacle()) {
    while (tilesToExplore.size > 0) {
      const tile = Array.from(tilesToExplore.keys(tilesToExplore))[0];
      tilesExplored.set(tile, tilesToExplore.get(tile));
      tilesToExplore.delete(tile);

      if (tile == targetedTile) {
        return tilesExplored;
      }

      const neighbours = tiles.get(tile).neighbours(tiles);
      for (let i = 0; i < neighbours.length; i++) {
        if (
          tilesExplored.has(neighbours[i].id) ||
          tilesToExplore.has(neighbours[i].id) ||
          neighbours[i].isObstacle()
        ) {
          continue;
        } else {
          tilesToExplore.set(neighbours[i].id, tile);
        }
      }
    }
    return [];
  } else {
    console.log("Erreur la case cible est un obstacle");
  }
}
module.exports = path;
