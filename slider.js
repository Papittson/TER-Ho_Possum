var nbPlayers = document.getElementById('nbP').selected;

//ne marche pas avec "else"
//affiche tous les nbPlayers si pas de "else"

//pareil avec .values;


if (nbPlayers == "1") {
    console.log("one");
}

else if (nbPlayers == "2") {
    console.log("two");
    document.getElementById("player2").style.display = "inline-block";
}

else if (nbPlayers == "3") {
    console.log("three");
    document.getElementById("player3").style.display = "inline-block";
}

else if (nbPlayers == "4") {
    console.log("four");
    document.getElementById("player4").style.display = "inline-block";
}


