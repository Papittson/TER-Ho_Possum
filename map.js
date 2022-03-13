function map(heightMap, heightTile, nbPlayers) {
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