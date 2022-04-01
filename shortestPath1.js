/* def parcours(case, caseCible, chemin) :
    chemin.push(case)
    if case == caseCible : return chemin
    for voisine of casesVoisines(case) :
        if voisine not in chemin :
           cheminTrouve = parcours(case, caseCible, chemin)
           if cheminTrouve != [] : return cheminTrouve
    return []*/

function route(listTile, currentTile, targetedTile, path) {
  path.push(currentTile);
  if (currentTile == targetedTile) {
    return path;
  }
  let neighbours = [];
  for (let tile of listTile) {
    if (currentTile.isNeighbour(tile)) neighbours.push(tile);
  }
  for (let neighbour of neighbours) {
    if (!path.include(neighbour)) {
      const foundPath = route(listTile, neighbour, targetedTile, path);
      if (foundPath.length != 0) return foundPath;
    }
  }
  return [];
}
