function displaySliders() {
  for (let i = 2; i < 5; i++) {
    document.getElementById(`player${i}`).classList.remove("hidden");
  }
  const nbOfPlayer = document.getElementById("nbOfPlayer").value;
  for (let i = 4; i > nbOfPlayer; i--) {
    document.getElementById(`player${i}`).setAttribute("class", "hidden");
  }
}
function changeListener() {
  document
    .getElementById("nbOfPlayer")
    .addEventListener("change", displaySliders);
}

module.exports = { changeListener };
