var creatures = [[], [], [], []]; // Les sous-listes seront remplies des objets correspondant aux créatures des joueurs

function action(creature, listTile, heightMap) {
  const movespeed = creature.movespeed < 3 ? 1 : creature.movespeed > 3 ? 3 : 2;
}

function tourDeJeu(players){
  for (player in listPlayer){
    for (creature in player.creature){
      action(creature);
    }
  }
}

function action(creature) {
  function action(creature, listTile, heightMap) {
    const movespeed =
      creature.movespeed < 3 ? 1 : creature.movespeed > 3 ? 3 : 2;
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
    currentTile(creature, listTile) == "hole"
  ) {
    satisfyNeeds("hole");
    return;
  }
  if (creature.needsLevel.sleep < criticalLevels.sleep) {
    creature.searchTile("hole");
    creature.goToTileByNeed(state.sleepy);
    return;
  }
  if (
    creature.needsLevel.sleep > criticalLevels.sleep &&
    creature.needsLevel.thrist > criticalLevels.thirst &&
    creature.needsLevel.hunger > scriticalLevels.hunger &&
    currentTile(creature, listTile) == "hole"
  ) {
    reproduce(creature);
    return;
  }
  if (
    creature.needsLevel.sleep > criticalLevels.sleep &&
    creature.needsLevel.thrist > criticalLevels.thirst &&
    creature.needsLevel.hunger > scriticalLevels.hunger
  ) {
    creature.searchTile("hole");
    creature.move();
    return;
  }
  }
}

setInterval(tourDeJeu, 1000); // 1000 millisecondes ou autre intervalle de temps
