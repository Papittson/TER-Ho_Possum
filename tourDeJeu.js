var creatures = [[], [], [], []]; // Les sous-listes seront remplies des objets correspondant aux créatures des joueurs
//var seuilSoif = [[], [], [], []]; // pour expliciter l'exemple
//var seuilFaim = [[], [], [], []]; // idem
//var seuilDodo = [[], [], [], []];

function action(creature) {
  //faire un switch?
  if (
    creature.needsLevel.thirst < criticalLevels.thirst &&
    currentTile(creature, listTile) == "water"
  ) {
    satisfyNeeds("water");
    return;
  }
  if (creature.needsLevel.thirst < criticalLevels.thirst) {
    creature.searchTile("water");
    creature.goToTileByNeed("thirst");
    return;
  }
  if (
    creature.needsLevel.hunger < criticalLevels.hunger &&
    currentTile(creature, listTile) == "grass"
  ) {
    satisfyNeeds("grass");
    return;
  }
  if (creature.needsLevel.hunger < scriticalLevels.hunger) {
    creature.searchTile("grass");
    creature.goToTileByNeed(state.hungry);
    return;
  }
  if (
    creature.needsLevel.hunger < criticalLevels.hunger &&
    currentTile(creature, listTile) == "forest"
  ) {
    satisfyNeeds("forest");
    return;
  }
  if (creature.needsLevel.hunger < criticalLevels.hunger) {
    creature.searchTile("forest");
    creature.goToTileByNeed(state.hungry);
    return;
  }
  if (
    creature.needsLevel.sleep < criticalLevels.sleep &&
    currentTile(creature, listTile) == "shed"
  ) {
    satisfyNeeds("shed");
    return;
  }
  if (creature.needsLevel.sleep < criticalLevels.sleep) {
    creature.searchTile("shed");
    creature.goToTileByNeed(state.sleepy);
    return;
  }
  if (
    creature.needsLevel.sleep > criticalLevels.sleep &&
    creature.needsLevel.thrist > criticalLevels.thirst &&
    creature.needsLevel.hunger > scriticalLevels.hunger &&
    currentTile(creature, listTile) == "shed"
  ) {
    reproduce(creature);
    return;
  }
  if (
    creature.needsLevel.sleep > criticalLevels.sleep &&
    creature.needsLevel.thrist > criticalLevels.thirst &&
    creature.needsLevel.hunger > scriticalLevels.hunger
  ) {
    creature.searchTile("shed");
    creature.move();
    return;
  }
}

setInterval(tourDeJeu, 1000); // 1000 millisecondes ou autre intervalle de temps
