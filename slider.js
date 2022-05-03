function player(option) {
    if (option === "") {
        document.getElementById('player1').style.display = "none";
        document.getElementById('player2').style.display = "none";
        document.getElementById('player3').style.display = "none";
        document.getElementById('player4').style.display = "none";
    }
    if (option === "1") {
        document.getElementById('player1').style.display = "block";
        document.getElementById('player2').style.display = "none";
        document.getElementById('player3').style.display = "none";
        document.getElementById('player4').style.display = "none";
    }
    if (option === "2") {
        document.getElementById('player1').style.display = "none";
        document.getElementById('player2').style.display = "block";
        document.getElementById('player3').style.display = "none";
        document.getElementById('player4').style.display = "none";
    }
    if (option === "3") {
        document.getElementById('player1').style.display = "none";
        document.getElementById('player2').style.display = "none";
        document.getElementById('player3').style.display = "block";
        document.getElementById('player4').style.display = "none";
    }
    if (option === "4") {
        document.getElementById('player1').style.display = "none";
        document.getElementById('player2').style.display = "none";
        document.getElementById('player3').style.display = "none";
        document.getElementById('player4').style.display = "block";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("player").addEventListener('change', function (evt) {
        player(evt.target.value);
    });

});
