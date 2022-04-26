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
      const perception = document.getElementById(`perception${i}`).value;
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
