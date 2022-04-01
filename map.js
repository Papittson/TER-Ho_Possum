class Tile {
  constructor(x, y, heightTile) {
    this.x = x;
    this.y = y;
    let tileType = (tileTotal[Math.floor(Math.random() * tileTotal.length)]);
    d3.select("#grid")
      .append("rect")
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("width", heightTile)
      .attr("height", heightTile)
      .attr("x", x * heightTile)
      .attr("y", y * heightTile)
      .attr("stroke", "black")
      .attr("id", tileType)
      .on("click", function(f) {
          console.log(d3.select(this).attr('id'))})
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

class Hole extends Tile {
  constructor(x, y, heightTile) {
      super(x,y, heightTile);
      d3.select("#grid")
      .append("rect")
      .attr("width", heightTile)
      .attr("height", heightTile)
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("fill", function(d) {
          return hole["color"];
      })
      .attr("stroke", "black")
      .attr("id", function(d) {
          return hole["id"];
      });
  } 
  }


function map(heightMap, heightTile, nbPlayers) {
  const listTile = [];
  d3.select("body")
    .append("svg")
    .attr("width", heightMap)
    .attr("height", heightMap)
    .attr("id", "grid")
  if (nbPlayers == 1) {
  for (let x = 0; x < heightMap/10; x++) {
    for (let y = 0; y < heightMap/10; y++) {
        if (x == 14 && y == 14) {
          listTile.push(new Hole(140,140,10));
        }
        else {
      listTile.push(new Tile(x, y, heightTile));
        }
    }
  }
  } else if (nbPlayers == 2) {
      for (let x = 0; x < heightMap/10; x++) {
          for (let y = 0; y < heightMap/10; y++) {
              if (x == 19 && y == 2) {
                listTile.push(new Hole(190,20,10));
              }
              else if (x == 19 && y == 37) {
                  listTile.push(new Hole(190,370,10));
                }
              else {
            listTile.push(new Tile(x, y, heightTile));
              }
          }
      }
  }
  else if (nbPlayers == 3) {
      for (let x = 0; x < heightMap/10; x++) {
          for (let y = 0; y < heightMap/10; y++) {
              if (x == 25 && y == 2) {
                listTile.push(new Hole(250,20,10));
              }
              else if (x == 2 && y == 47) {
                  listTile.push(new Hole(20,470,10));
                }
              else if (x == 47 && y == 47) {
                  listTile.push(new Hole(470,470,10));
                }
              else {
            listTile.push(new Tile(x, y, heightTile));
              }
          }
      }
  }
  else if (nbPlayers == 4) {
      for (let x = 0; x < heightMap/10; x++) {
          for (let y = 0; y < heightMap/10; y++) {
              if (x == 25 && y == 2) {
                listTile.push(new Hole(250,20,10));
              }
              else if (x == 2 && y == 25) {
                  listTile.push(new Hole(20,250,10));
                }
              else if (x == 25 && y == 47) {
                  listTile.push(new Hole(250,470,10));
                }
              else if (x == 47 && y == 25) {
                  listTile.push(new Hole(470,250,10));
                }
              else {
            listTile.push(new Tile(x, y, heightTile));
              }
          }
      }
  }

}