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

module.exports = {
  random,
  last,
};
