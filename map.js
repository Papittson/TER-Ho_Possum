function map(heightMap, heightTile) {
  var tile = {
      soil: 20,
      grass: 20,
      rock: 7,
      forest: 10,
      water: 1
    }
  var tileTotal = [];
  var n = 0;
  while (n < Object.keys(tile).length) {
    for (i = 0; i <  Object.values(tile)[n]; i++)
        tileTotal[tileTotal.length] = Object.keys(tile)[n];
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
              return "#cacfd2";
              } else if (randomID === "soil") {
              return "#a04000";
              } else if (randomID === "grass") {
              return "#81c784";
              } else if (randomID === "forest") {
              return "#0e6655";
              } else if (randomID === "water") {
              return "#aed6f1";
              }
          });
      }
    }
  }
