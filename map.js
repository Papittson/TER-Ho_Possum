function map(height) {
   var tile = {
      soil: "#a04000",
      water: "#aed6f1",
      grass: "#81c784",
      rock: "#cacfd2",
      forest: "#0e6655"
  
  }

  var randomColor = Object.values(tile)[Math.floor(Math.random() * Object.values(tile).length)]
  
    var svg = d3.select("body").append("svg").attr("width", "500").attr("height", "500");
    var x = 100, y = 100, height = 50;
    svg.selectAll("rect")
        .data(d3.range(x * y))
        .enter()
        .append("rect")
        .attr("transform", translate)
        .attr("width", height)
        .attr("height", height)
        .attr("stroke", "black")
        .attr("fill", randomColor);

function translate(d) {
  return "translate(" + (d % x) * height + "," + Math.floor(d / x) * height + ")";
}
}