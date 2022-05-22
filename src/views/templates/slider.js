module.exports = (need, id, text) =>
  `<div class="slider-container">
  <label for="${need}_${id}" class="thin-text">
        ${text} :
        <span id="${need}-points_${id}">1</span>
    </label>
    <input
        class="slider"
        type="range"
        id="${need}_${id}"
        name="${need}_${id}"
        step="1"
        min="1"
        max="5"
        value="1"
    />
    </div>`;
