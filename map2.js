function map(x, y, height) {
   var tile = {
      soil: "#a04000",
      water: "#aed6f1",
      grass: "#81c784",
      rock: "#cacfd2",
      forest: "#0e6655"
  
  }
  var svg = d3.select("body").append("svg").attr("width", "500").attr("height", "500");
  
  function randomColor(d){
    return Object.values(tile)[Math.floor(Math.random() * Object.values(tile).length)]
   }
  function randomID(i) {
     return Object.keys(tile)[Math.floor(Math.random() * Object.keys(tile).length)]
   }
    svg.selectAll("rect")
        .data(d3.range(x * y))
        .enter()
        .append("rect")
        .attr("transform", translate)
        .attr("width", height)
        .attr("height", height)
        .attr("stroke", "black")
        .attr("id", randomID)
        .attr("fill", randomColor); // pour l'instant la couleur générée peut être différente que l'ID généré :(

function translate(d) {
  return "translate(" + (d % x) * height + "," + Math.floor(d / x) * height + ")";
}
}