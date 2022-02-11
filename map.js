function map(height, nbRows, nbColumns) {
    d3.select("#map").append("svg").attr("width", (nbRows+1)*height).attr("height", nbRows*height);
    let x = 50;

    var carre = [terre, eau, herbe];
    var randomColor = carre[Math.floor(Math.random() * carre.length)];

    for (let row=0; row < nbRows; row++) {
       y = 0;	     
   for (let column=0; column < nbColumns; column++) {
   
         let d = "";
         d += "Z";
         d3.select("svg")
            .append("rect")
        .attr("width", height)
        .attr("height", height)	      
        .attr("x", x)	      
            .attr("y", y)	      
            .attr("stroke", "black")
            .attr("fill", randomColor) /*comment remplir différentes couleurs sur chaque case?*/
            .attr("id", row+" "+column)
            .on("click", function(d) {
        console.log(d3.select(this).attr('id'));
        let data = d3.select(this).attr('id').split(" ");
        console.log(data[0]+","+data[1]);
     });
           y += height;
   }
   x += height;
    }
 }



function terre() {
    return "#a04000";
    /* fréquence ? */
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
