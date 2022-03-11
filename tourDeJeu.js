var creatures = [[], [], [], []];  // Les sous-listes seront remplies des objets correspondant aux créatures des joueurs
var seuilSoif =  [[], [], [], []] ; // pour expliciter l'exemple
var seuilFaim =  [[], [], [], []] ; // idem
var seuilDodo = [[], [], [], []] ; 

function action(creature) {
        if (creature.needsLevel.thirst < seuilSoif && localisationCase("water", creature)) {drink(creature); return }  // {satisfyNeeds(grass); return}
        if (creature.needsLevel.thirst < seuilSoif ) { search("water",creature); return } //action recherche/search == environnementAnalysis
        if (creature.needsLevel.hunger < seuilFaim && localisationCase("grass", creature)) {eat(creature); return } //action broutage == satisfyneeds.hunger ? 
        if (creature.needsLevel.hunger < seuilFaim ) { recherche("grass", creature); return }
        if (creature.needsLevel.sleep < seuilDodo && localisationCase("tanniere", creature)){sleep(creature); return}
        if (creature.needsLevel.sleep < seuilDodo){search("tanniere", creature); return}
        if (creature.needsLevel.sleep > seuilDodo && creature.needsLevel.thrist > seuilSoif && creature.needsLevel.hunger > seuilFaim && localisationCase("tanniere", creature) /* && creature (x2) ? */){reproduce(creature); return}
        if (creature.needsLevel.sleep > seuilDodo && creature.needsLevel.thrist > seuilSoif && creature.needsLevel.hunger > seuilFaim) {search("tanniere", creature); return}
}

setInterval(tourDeJeu, 1000);  // 1000 millisecondes ou autre intervalle de temps
