export default function getShipCoords(puzzleNumber) {
  const coords = [];

  const date = new Date();

  const x = (puzzleNumber + date.getDay()) % 5;
  const y = (puzzleNumber + date.getFullYear()) % 5;
  coords.push({ x, y });

  const orientation = (x + y) % 2 === 0 ? "horizontal" : "vertical";
  if (orientation === "horizontal") {
    // keep y the same and change x
    if (x < 2) {
      coords.push({ x: x + 1, y }, { x: x + 2, y }, { x: x + 3, y });
    } else if (x > 3) {
      coords.push({ x: x - 1, y }, { x: x - 2, y }, { x: x - 3, y });
    } else {
      coords.push({ x: 1, y }, { x: 0, y }, { x: 3, y });
    }
  } else {
    // keep x the same and change y
    if (y < 2) {
      coords.push({ y: y + 1, x }, { y: y + 2, x }, { y: y + 3, x });
    } else if (y > 3) {
      coords.push({ y: y - 1, x }, { y: y - 2, x }, { y: y - 3, x });
    } else {
      coords.push({ y: 1, x }, { y: 0, x }, { y: 3, x });
    }
  }

  return coords;
}
