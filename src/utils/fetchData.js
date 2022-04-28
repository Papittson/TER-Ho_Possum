function fetchData() {
  const nbOfPlayer = parseInt(document.getElementById("nbOfPlayer").value);
  const players = [];
  for (let i = 1; i < nbOfPlayer + 1; i++) {
    if (!document.getElementById(`player${i}`).classList.contains("hidden")) {
      const species = document.getElementById(`speciePlayer${i}`).value;
      const reproducibility = document.getElementById(
        `reproducibility${i}`
      ).value;
      const strength = document.getElementById(`strength${i}`).value;
      const movespeed = document.getElementById(`moveSpeed${i}`).value;
      let perception = document.getElementById(`perception${i}`).value;
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
