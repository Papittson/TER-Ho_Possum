//il faut lier les cases à leur parent, récuperer le chemin le plus court

function path(tilesExplored, tilesToExplore, targetedTile, listTile) {
  while (tilesToExplore.length != 0) {
    tile = tilesToExplore.shift();
    const neighbours = tile.neighbours(listTile);
    for (let i = 0; i < neighbours.length; i++) {
      tileExplored.push({ parent: tile, child: neighbours[i] });
    }
    if (tile == targetedTile) {
      return tilesExplored;
    }
    tilesToExplore = tilesToExplore.concat(tile.neighbours(listTile));
  }
  return [];
}
