//il faut lier les cases à leur parent, récuperer le chemin le plus court

// eslint-disable-next-line no-unused-vars
function path(tilesExplored, tilesToExplore, targetedTile, tiles) {
  let cpt = 0;
  while (tilesToExplore.length != 0) {
    cpt++;
    if (cpt == 4) {
      debugger;
    }
    const tile = tilesToExplore.shift();
    tilesExplored.push(tile);
    const neighbours = tile.neighbours(tiles);
    for (let i = 0; i < neighbours.length; i++) {
      if (
        tilesExplored.includes({ parent: tile, child: neighbours[i] }) ||
        tilesExplored.includes(neighbours[i])
      ) {
        continue;
      } else {
        tilesExplored.push();
      }
    }
    if (tile == targetedTile) {
      return tilesExplored;
    }
    tilesToExplore = tilesToExplore.concat(neighbours);
  }
  return [];
}
module.exports = path;
