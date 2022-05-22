const D3 = require("../utils/d3");
const { SETTINGS } = require("../utils/constants.js");
const { MAX_PLAYERS, MAX_POINTS, MAX_NEED } = SETTINGS;
const containerTemplate = require("./templates/container.js");

// Form data
let playersNumber = { id: 0, total: 1, min: 1, max: 4 };
let roundsNumber = { id: 1, total: 50, min: 50, max: Infinity };
const players = [];

for (let i = 0; i < MAX_PLAYERS; i++) {
  players.push({
    img: "",
    mobility: 1,
    reproduction: 1,
    perception: 1,
    strength: 1,
  });
}

// Create player sections in the form
for (let playerId = 0; playerId < MAX_PLAYERS; playerId++) {
  const container = D3.select(`#container_${playerId}`);
  container.html(containerTemplate(playerId));
  updateRemainingPoints(playerId);
}

// Update inputs values
updateInputs();

// Add event listeners to form elements
D3.select("#minus_0").on("click", () => editInput(playersNumber, -1));
D3.select("#plus_0").on("click", () => editInput(playersNumber, 1));
D3.select("#minus_1").on("click", () => editInput(roundsNumber, -10));
D3.select("#plus_1").on("click", () => editInput(roundsNumber, 10));
D3.selectAll(".slider").on("input", (event) => changeNeedPoints(event));
D3.selectAll("select")
  .datum("")
  .on("change", (event) => updateSelects(event));

// FUNCTIONS

function updateRemainingPoints(playerId) {
  const pointsHtmlElem = D3.select(`#points_${playerId}`);
  const { mobility, reproduction, perception, strength } = players[playerId];
  const totalPoints = mobility + reproduction + perception + strength;
  const remainingPoints = MAX_POINTS - totalPoints;
  pointsHtmlElem.html(remainingPoints);
}

function changeNeedPoints(event) {
  let [need, playerId] = event.target.id.split("_");
  playerId = parseInt(playerId);
  const value = parseInt(event.target.value);
  const player = players[playerId];
  player[need] = value;
  const sliderPoints = D3.select(`#${need}-points_${playerId}`);
  sliderPoints.html(value);
  updateRemainingPoints(playerId);
  updateSliders();
}

function updateSliders() {
  const needs = ["mobility", "reproduction", "perception", "strength"];
  for (let playerId = 0; playerId < MAX_PLAYERS; playerId++) {
    const remainingPoints = parseInt(D3.select(`#points_${playerId}`).html());
    for (let need of needs) {
      const slider = D3.select(`#${need}_${playerId}`);
      const sliderValue = parseInt(slider.property("value"));
      const sliderMax = Math.min(MAX_NEED, remainingPoints + sliderValue);
      slider.property("max", sliderMax);
    }
  }
}

function editInput(input, amount) {
  let { total, min, max } = input;
  const value = total + amount;
  input.total = amount > 0 ? Math.min(value, max) : Math.max(value, min);
  updateInputs();
}

function updateInputs() {
  D3.select("#input_0").html(playersNumber.total);
  D3.select("#input_1").html(roundsNumber.total);
  updateContainers();
}

function updateContainers() {
  const { total } = playersNumber;
  for (let playerId = 0; playerId < MAX_PLAYERS; playerId++) {
    const container = D3.select(`#container_${playerId}`);
    const select = D3.select(`#species_${playerId}`);
    const setHidden = playerId >= total;
    const isRequired = setHidden ? undefined : true;
    container.classed("removed", setHidden);
    select.attr("required", isRequired);
  }
}

function updateSelects(event) {
  let [, playerId] = event.target.id.split("_");
  const select = D3.select(`#${event.target.id}`);
  const oldValue = select.datum();
  const selectValue = select.property("value");
  players[playerId].img = selectValue;
  for (let i = 0; i < MAX_PLAYERS; i++) {
    const options = D3.select(`#species_${i}`).selectChildren("option");
    options.each(function () {
      const option = D3.select(this);
      if (option.property("value") == oldValue) {
        option.attr("hidden", undefined);
      }
      if (
        option.property("value") == selectValue &&
        option.property("value") != ""
      ) {
        option.attr("hidden", true);
      }
    });
  }
  select.datum(selectValue);
}

function checkInputs() {
  for (let i = 0; i < playersNumber.total; i++) {
    for (let j = i + 1; j < playersNumber.total; j++) {
      const player1 = players[i];
      const player2 = players[j];
      if (
        player1.mobility === player2.mobility &&
        player1.reproduction === player2.reproduction &&
        player1.perception === player2.perception &&
        player1.strength === player2.strength
      ) {
        alert("Deux joueurs ne peuvent pas avoir la même configuration !");
        return false;
      }
    }
  }
  return true;
}

/**
 * Fetch form data.
 * @returns {Promise} Promise that returns data fetch from form
 */
function fetchFormData() {
  const form = D3.select("#form");
  const promise = new Promise((resolve) => {
    form.on("submit", (event) => {
      event.preventDefault();
      if (checkInputs()) {
        form.classed("removed", true);
        D3.select("h1").classed("removed", true);
        players.length = playersNumber.total;
        const formData = {
          players,
          maxRounds: roundsNumber.total,
        };
        resolve(formData);
      }
    });
  });
  return promise;
}

module.exports = fetchFormData;
