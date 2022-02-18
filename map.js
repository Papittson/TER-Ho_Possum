function map(heightMap, heightTile) {
   var tile = {
      soil: "#a04000",
      water: "#aed6f1",
      grass: "#81c784",
      rock: "#cacfd2",
      forest: "#0e6655"
  
  }
  var svg = d3.select("body").append("svg").attr("width", heightMap).attr("height", heightMap);
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
   let randomColor = Object.values(tile)[Math.floor(Math.random() * Object.values(tile).length)]
    

        svg.append("rect")
        .attr("width", heightMap)
        .attr("height", heightMap)
        .attr("x", x*heightTile)
        .attr("y", y*heightTile)
        .attr("stroke", "black")
        .attr("fill", randomColor);
      }}

    }