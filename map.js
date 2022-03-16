function map(heightMap, heightTile, nbPlayers) {
  var svg = d3.select("body").append("svg").attr("width", heightMap).attr("height", heightMap);
  for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 100; y++) {
      
          let tileType = (tileTotal[Math.floor(Math.random() * tileTotal.length)])
          svg.append("rect")
          .attr("width", heightMap)
          .attr("height", heightMap)
          .attr("x", x*heightTile)
          .attr("y", y*heightTile)
          .attr("stroke", "black")
          .attr("id", tileType)
          .attr("fill", function(d) {
            if (tileType === "rock") {
              return rock["color"];
              } else if (tileType === "soil") {
              return soil["color"];
              } else if (tileType === "grass") {
              return grass["color"];
              } else if (tileType === "forest") {
              return forest["color"];
              } else if (tileType === "water") {
              return water["color"];
              }
          });
      }
    }
    class Hole {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        static nbHole(x, y) {
          svg.append("rect")
            .attr("width", 20)
            .attr("height", heightTile)
            .attr("x", x)
            .attr("y", y)
            .attr("fill", function(d) {
                return hole["color"];
            })
            .attr("stroke", "black")
            .attr("id", function(d) {
                return hole["id"];
            });
        }
    }
    
    if (nbPlayers === 1) {
        Hole.nbHole(140, 140);
    } else if (nbPlayers === 2) {
        Hole.nbHole(190, 20);
        Hole.nbHole(190, 370);
    } else if (nbPlayers === 3) {
        Hole.nbHole(250, 20);
        Hole.nbHole(20, 470);
        Hole.nbHole(460, 470);
    } else if (nbPlayers === 4) {
        Hole.nbHole(250, 20);
        Hole.nbHole(20, 250);
        Hole.nbHole(250, 470);
        Hole.nbHole(470, 250);
    }
  }
