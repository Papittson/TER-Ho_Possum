function fetchData() {
  const nbOfPlayer = parseInt(document.getElementById("nbOfPlayer").value);
  const players = [];
  for (let i = 0; i < nbOfPlayer; i++) {
    if (!document.getElementById(`player_${i}`).classList.contains("hidden")) {
      const species = document.getElementById(`speciePlayer_${i}`).value;
      const reproducibility = document.getElementById(
        `reproducibility_${i}`
      ).value;
      const strength = document.getElementById(`strength_${i}`).value;
      const movespeed = document.getElementById(`moveSpeed_${i}`).value;
      let perception = document.getElementById(`perception_${i}`).value;
      perception = perception < 3 ? 2 : perception > 3 ? 6 : 4;
      players.push({
        species,
        reproducibility,
        strength,
        movespeed,
        perception,
      });
    }
  }
  return players;
}

module.exports = fetchData;
