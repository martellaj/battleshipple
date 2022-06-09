export default function getShipCoords(puzzleNumber) {
  return puzzles[puzzleNumber - 1];
}

const puzzles = [
  // 6/9/2022 (#1)
  [
    {
      x: 0,
      y: 2,
    },
    {
      x: 1,
      y: 2,
    },
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 2,
    },
  ],
  // 6/10/2022 (#2)
  [
    {
      x: 2,
      y: 1,
    },
    {
      x: 2,
      y: 2,
    },
    {
      x: 2,
      y: 3,
    },
    {
      x: 2,
      y: 4,
    },
  ],
];
