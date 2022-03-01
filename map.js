function map(heightMap, heightTile) {
  const soil = {
    id: "soil",
    color: "#a04000",
    freq : 20
    }

  const grass = {
      id: "grass",
      color: "#81c784",
      freq : 20
  }

  const forest = {
      id: "forest",
      color: "#0e6655",
      freq : 10
  }

  const rock = {
      id: "rock",
      color: "#cacfd2",
      freq : 7
  }

  const water = {
      id: "water",
      color: "#aed6f1",
      freq : 1
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


  var svg = d3.select("body").append("svg").attr("width", heightMap).attr("height", heightMap);
  for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 100; y++) {
      
          let randomID = (tileTotal[Math.floor(Math.random() * tileTotal.length)])
          svg.append("rect")
          .attr("width", heightMap)
          .attr("height", heightMap)
          .attr("x", x*heightTile)
          .attr("y", y*heightTile)
          .attr("stroke", "black")
          .attr("id", randomID)
          .attr("fill", function(d) {
            if (randomID === "rock") {
              return rock["color"];
              } else if (randomID === "soil") {
              return soil["color"];
              } else if (randomID === "grass") {
              return grass["color"];
              } else if (randomID === "forest") {
              return forest["color"];
              } else if (randomID === "water") {
              return water["color"];
              }
          });
      }
    }
  }