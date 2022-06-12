export default function getShipCoords(puzzleNumber) {
  const cachedCoords = window.localStorage.getItem(`coords-${puzzleNumber}`);
  const _cachedCoords = cachedCoords ? JSON.parse(cachedCoords) : null;

  if (_cachedCoords) {
    return _cachedCoords;
  }

  const coords = [];

  const x = getRandomInt(0, 3);
  const y = getRandomInt(0, 3);

  coords.push({ x, y });

  const orientation = (x + y) % 2 === 0 ? "horizontal" : "vertical";
  if (orientation === "horizontal") {
    // keep y the same and change x
    if (x < 2) {
      coords.push({ x: x + 1, y }, { x: x + 2, y });
    } else if (x > 2) {
      coords.push({ x: x - 1, y }, { x: x - 2, y });
    } else {
      coords.push({ x: 1, y }, { x: 0, y });
    }
  } else {
    // keep x the same and change y
    if (y < 2) {
      coords.push({ y: y + 1, x }, { y: y + 2, x });
    } else if (y > 2) {
      coords.push({ y: y - 1, x }, { y: y - 2, x });
    } else {
      coords.push({ y: 1, x }, { y: 0, x });
    }
  }

  window.localStorage.setItem(`coords-${puzzleNumber}`, JSON.stringify(coords));

  return coords;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
