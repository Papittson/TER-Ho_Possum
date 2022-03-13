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
    class Shed {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        static nbShed(x, y) {
          svg.append("rect")
            .attr("width", heightTile)
            .attr("height", heightTile)
            .attr("x", x)
            .attr("y", y)
            .attr("fill", function(d) {
                return shed["color"];
            })
            .attr("stroke", "black")
            .attr("id", function(d) {
                return shed["id"];
            });
        }
    }
    
    if (nbPlayers === 1) {
        Shed.nbShed(250, 20);
    } else if (nbPlayers === 2) {
        Shed.nbShed(250, 20);
        Shed.nbShed(20, 250);
    } else if (nbPlayers === 3) {
        Shed.nbShed(250, 20);
        Shed.nbShed(20, 250);
        Shed.nbShed(250, 470);
    } else if (nbPlayers === 4) {
        Shed.nbShed(250, 20);
        Shed.nbShed(20, 250);
        Shed.nbShed(250, 470);
        Shed.nbShed(470, 250);
    }
  }
