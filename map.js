function map(heightMap, heightTile) {
  const soil = {
    id: "soil",
    color: "#8e5e4d",
    freq : 20
    }

  const grass = {
      id: "grass",
      color: "#9bb945",
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
      color: "#6ccbfa",
      freq : 1
  }

  const shed = {
    id: "shed",
    color: "#ff1313"
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

    svg.append("rect")
    .attr("width", heightTile)
    .attr("height", heightTile)
    .attr("x", 250)
    .attr("y", 20)
    .attr("fill", function(d) {
        return shed["color"];
    })
    .attr("stroke", "black")
    .attr("id", function(d) {
        return shed["id"];
    }); 


    // x = 250; y = 20    1           ??? dfjhkjds
    // x = 20; y = 250    2
    // x = 250; y = 480   3
    // x = 480; y = 250   4

  }
