function start(heightMap, heightTile) {
    const listTile = [];
    d3.select("body")
      .append("svg")
      .attr("width", heightMap)
      .attr("height", heightMap)
      .attr("id", "grid")
      .attr("fill", "red");
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        listTile.push(new Tile(x, y, heightTile, "dirt"));
      }
    }
    let lapin = new Creature(2,2,1,1,1,1,heightTile,"L1");
      console.log(lapin);
      console.log(lapin.getX()+", "+lapin.getY());
      lapin.move(3,3);
      
  }