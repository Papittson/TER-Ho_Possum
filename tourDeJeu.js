var creatures = [[], [], [], []]; // Les sous-listes seront remplies des objets correspondant aux créatures des joueurs
var seuilSoif = [[], [], [], []]; // pour expliciter l'exemple
var seuilFaim = [[], [], [], []]; // idem
var seuilDodo = [[], [], [], []];

function action(creature) {
  //faire un switch?
  if (
    creature.needsLevel.thirst < criticalLevels.thirst &&
    currentTile(creature, listTile) == "water"
  ) {
    satisfyNeeds(water);
    return;
  }
  if (creature.needsLevel.thirst < criticalLevels.thirst) {
    creature.searchTile("water");
    //commencer le deplacement vers la case
    return;
  } //{environnmentAnalysis(listTile); return}
  if (
    creature.needsLevel.hunger < criticalLevels.hunger &&
    currentTile("grass", creature)
  ) {
    satisfyNeeds(grass);
    return;
  }
  if (creature.needsLevel.hunger < seuilFaim) {
    recherche("grass", creature);
    return;
  } //{environnmentAnalysis(listTile); return}
  if (
    creature.needsLevel.hunger < seuilFaim &&
    localisationCase("forest", creature)
  ) {
    satisfyNeeds(forest);
    return;
  }
  if (creature.needsLevel.hunger < seuilFaim) {
    recherche("forest", creature);
    return;
  } //{environnmentAnalysis(listTile); return}
  if (
    creature.needsLevel.sleep < seuilDodo &&
    localisationCase("shed", creature)
  ) {
    satisfyNeeds(hole);
    return;
  }
  if (creature.needsLevel.sleep < seuilDodo) {
    search("shed", creature);
    return;
  } //{environnmentAnalysis(listTile); return}
  if (
    creature.needsLevel.sleep > seuilDodo &&
    creature.needsLevel.thrist > seuilSoif &&
    creature.needsLevel.hunger > seuilFaim &&
    localisationCase("shed", creature) /* && creature (x2) ? */
  ) {
    reproduce(creature);
    return;
  }
  if (
    creature.needsLevel.sleep > seuilDodo &&
    creature.needsLevel.thrist > seuilSoif &&
    creature.needsLevel.hunger > seuilFaim
  ) {
    search("shed", creature);
    return;
  } //{environnmentAnalysis(listTile); return}
}

setInterval(tourDeJeu, 1000); // 1000 millisecondes ou autre intervalle de temps
