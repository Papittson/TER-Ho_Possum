const soil = {
    id: "soil",
    color: "#8e5e4d",
    freq : 20
    }

  const grass = {
      id: "grass",
      color: "#81c784",
      freq : 20,
      hunger: 30
  }

  const forest = {
      id: "forest",
      color: "#0e6655",
      freq : 10,
      hunger: 20
  }

  const rock = {
      id: "rock",
      color: "#cacfd2",
      freq : 7
  }

  const water = {
      id: "water",
      color: "#6ccbfa",
      freq : 1,
      thirst : 50
  }

  const shed = {
    id: "shed",
    color: "#ff1313",
    sleep: 100
  }

  var idFreq = {
      soil: soil["freq"],
      grass: grass["freq"],
      rock: rock["freq"],
      forest: forest["freq"],
      water: water["freq"]
    }
    
  var tileTotal = [];
  var n = 0;
  while (n < Object.keys(idFreq).length) {
  for (i = 0; i <  Object.values(idFreq)[n]; i++)
      tileTotal[tileTotal.length] = Object.keys(idFreq)[n];
  n++;
  }