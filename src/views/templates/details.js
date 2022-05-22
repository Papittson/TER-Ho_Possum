module.exports = (player, id) => {
  const { img, reproducibility, moveSpeed, perception, strength } = player;
  return `<details>
        <summary>
            INFORMATIONS DU JOUEUR ${id + 1}
        <img
            alt="Creature icon"
            src="${img}"
        />
        </summary>
        <ul>
            <li>
                <span id="creatures_${id}">?</span> créatures créées.
            </li>
            <li>
                <span id="alives_${id}">?</span> créature(s) en vie.
            </li>
        </ul>
        <p>🐌 Mobilité : ${moveSpeed} cases</p>
        <p>💕 Reproduction : ${reproducibility}</p>
        <p>👁️ Perception : ${perception} cases</p>
        <p>💪 Force : ${strength}</p>
    </details>`;
};
