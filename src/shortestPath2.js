//il faut lier les cases à leur parent, récuperer le chemin le plus court

// eslint-disable-next-line no-unused-vars
function path(tilesExplored, tilesToExplore, targetedTile, tiles) {
  while (tilesToExplore.length != 0) {
    const tile = tilesToExplore.shift();
    const neighbours = tile.neighbours(tiles);
    for (let i = 0; i < neighbours.length; i++) {
      tilesExplored.push({ parent: tile, child: neighbours[i] });
    }
    if (tile == targetedTile) {
      return tilesExplored;
    }
    tilesToExplore = tilesToExplore.concat(tile.neighbours(tiles));
  }
  return [];
}
module.exports = path;
