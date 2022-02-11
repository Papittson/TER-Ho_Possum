var lapin = {
    positionX : 0,
    positionY : 0,
    reproductivité : 5,
    force : 5,
    vitesse :5,
    perception : 5,
    besoin : {"energie" : 100,"hydratation":100,"faim":100},
    deplacement: function(x,y){lapin.positionX=x;lapin.positionY=y;},
    satisfactionBesoin: function(){}
}