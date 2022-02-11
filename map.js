function map(height, nbRows, nbColumns) {
    d3.select("#map").append("svg").attr("width", (nbRows+1)*height).attr("height", nbRows*height);
    let x = 50;
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
            .attr("fill", "white")
            .attr("id", row+" "+column);
                   y += height;
           }
           x += height;
            }
         }
         