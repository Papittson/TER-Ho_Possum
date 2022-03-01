function map(heightMap, heightTile) {
  const soil = {
    id: "soil",
    color: "#a04000"
    }

  const grass = {
      id: "grass",
      frequency: 20,
      color: "#81c784"
  }

  const forest = {
      id: "forest",
      color: "#0e6655"
  }

  const rock = {
      id: "rock",
      color: "#cacfd2"
  }

  const water = {
      id: "water",
      color: "#aed6f1"
  }
  var frequency = {
      soil: 20,
      grass: 20,
      rock: 7,
      forest: 10,
      water: 1
    }
  var tileTotal = [];
  var n = 0;
  while (n < Object.keys(frequency).length) {
  for (i = 0; i <  Object.values(frequency)[n]; i++)
      tileTotal[tileTotal.length] = Object.keys(frequency)[n];
      n++; } 

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
