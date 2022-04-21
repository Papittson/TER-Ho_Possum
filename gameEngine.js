function start(nbOfPlayer, heightMap, heightTile) {
  const listTile = new Map();
  d3.select("body")
    .append("svg")
    .attr("width", heightMap)
    .attr("height", heightMap)
    .attr("id", "grid")
    .attr("fill", "none");
  const shed = { x: 2, y: 2 };
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let keyId = x.toString() + ";" + y.toString();
      listTile.set(keyId, new Tile(x, y, heightTile, "hole"));
    }
  }
  console.log(listTile);
  const p1 = new Player("lapin", 1, 1, 1, 1);

  p1.creatures.push(new Creature(2, 2, p1, shed, heightTile));

  const creaturesP1 = p1.creatures;
  const creature1 = creaturesP1[0];

  const t1 = new Tile(2, 2, heightTile, "hole");
  console.log(creature1.scanArea(listTile, heightMap));

  const path = path([], creature1.currentTile);

  /*const listPlayer = [];
  for (let i = 0; i < nbOfPlayer; i++) {
    //TO DO : recuperer les valeurs des input pour pouvoir créer le joueur
    listPlayer.push(new Player(speciesName, rInput, sInput, mInput, pInput));
    currentPlayer = listPlayer[i];
    currentPlayer.addCreature(
      new Creature(xPosOfHome1, yPosOfHome1, currentPlayer, heightTile)
    );
    currentPlayer.addCreature(
      new Creature(xPosOfHome2, yPosOfHome2, currentPlayer, heightTile)
    );
  }*/

  //commencer le tour de jeu sur la liste des joueurs
}

function reproduce(creatures, tile) {
  var sameCre = [];
  for (let creature of creatures) {
    if (
      tile.tileType == "hole" &&
      creature.x == tile.x &&
      creature.y == tile.y
    ) {
      sameCre.push(creature);
    }
  }
  if (sameCre.length >= 2) {
    creatures.push("newCreature");
  }
  return creatures;
}

function currentTile(creature, listTile) {
  //return creature.scanArea[0];
  for (let tile of listTile) {
    if (creature.x == tile.x && creature.y == tile.y) {
      return tile.tileType;
    }
  }
}
