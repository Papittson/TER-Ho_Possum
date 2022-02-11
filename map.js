function map(height) {
    var tile= [terre, eau, herbe, roche, foret];
    var randomColor = tile[Math.floor(Math.random() * tile.length)];

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

function terre() {
   return "#a04000";
}

function eau() {
   return "#aed6f1";
}

function herbe(){
   return "#81c784";
}

function taniere(){
   return "#e74c3c";
}

function roche(){
   return  "#cacfd2";
}

function foret() {
   return "#0e6655";
}
}