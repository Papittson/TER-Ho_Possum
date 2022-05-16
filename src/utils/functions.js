const D3 = require("./d3");

/**
 * Get a random item from an array.
 * @param {Object[]} array
 * @returns {Object}
 */
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get the last item from an array.
 * @param {Object[]} array
 * @returns {Object}
 */
function last(array) {
  return array[array.length - 1];
}

/**
 * Fetch form data.
 * @returns {Object[]} Data fetch from form
 */
function fetchFormData() {
  const maxRounds = parseInt(D3.select("#nbOfRounds").property("value"));
  const nbOfPlayers = parseInt(D3.select("#nbOfPlayers").property("value"));
  const data = [];
  for (let i = 0; i < nbOfPlayers; i++) {
    if (!D3.select(`#player_${i}`).classed("hidden")) {
      const img = D3.select(`#playerSpecies_${i}`).property("value");
      const reproducibility = D3.select(`#reproducibility_${i}`).property(
        "value"
      );
      const strength = parseInt(D3.select(`#strength_${i}`).property("value"));
      const moveSpeed = parseInt(
        D3.select(`#moveSpeed_${i}`).property("value")
      );
      const perception = parseInt(
        D3.select(`#perception_${i}`).property("value")
      );
      data.push({
        img,
        reproducibility,
        strength,
        moveSpeed,
        perception,
      });
    }
  }
  return { maxRounds: maxRounds, players: data };
}

module.exports = {
  random,
  last,
  fetchFormData,
};
