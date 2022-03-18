function start(nbOfPlayer, heightMap, heightTile) {
  const listTile = [];
  d3.select("body")
    .append("svg")
    .attr("width", heightMap)
    .attr("height", heightMap)
    .attr("id", "grid")
    .attr("fill", "red");
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      listTile.push(new Tile(x, y, heightTile, "dirt"));
    }
  }
  const p1 = new Player("lapin", 1, 1, 1, 1);
  p1.creatures.push(new Creature(2, 2, p1, heightTile));
  const creaturesP1 = p1.creatures;

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

function reproduce() {
  //TODO
}

function currentTile(creature, listTile) {
  //TODO
}
