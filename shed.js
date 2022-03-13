class Shed {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static nbShed(x, y) {
      svg.append("rect")
        .attr("width", heightTile)
        .attr("height", heightTile)
        .attr("x", x)
        .attr("y", y)
        .attr("fill", function(d) {
            return shed["color"];
        })
        .attr("stroke", "black")
        .attr("id", function(d) {
            return shed["id"];
        });
    }
}

 if (nbPlayers === 1) {
    Shed.nbShed(250, 20);
} else if (nbPlayers === 2) {
    Shed.nbShed(250, 20);
    Shed.nbShed(20, 250);
} else if (nbPlayers === 3) {
    Shed.nbShed(250, 20);
    Shed.nbShed(20, 250);
    Shed.nbShed(250, 470);
} else if (nbPlayers === 4) {
    Shed.nbShed(250, 20);
    Shed.nbShed(20, 250);
    Shed.nbShed(250, 470);
    Shed.nbShed(470, 250);
}