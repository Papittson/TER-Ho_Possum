const slider = require("./slider.js");
module.exports = (id) =>
  `<div>
    <h2 class="center">Joueur ${id + 1}</h2>
    <p>
      Points restants :
      <span id="points_${id}">?</span>
    </p>
  </div>
  <select id="species_${id}" name="species_${id}" required>
    <option selected value="">Choisissez votre espèce</option>
    <option value="./images/CREATURE_0.png">🐰 Lapin</option>
    <option value="./images/CREATURE_1.png">🐹 Hamster</option>
    <option value="./images/CREATURE_2.png">🐭 Rat</option>
    <option value="./images/CREATURE_3.png">🦝 Raton</option>
  </select>
  ${slider("mobility", id, "Mobilité")}
  ${slider("reproduction", id, "Reproduction")}
  ${slider("perception", id, "Perception")}
  ${slider("strength", id, "Force")}`;
