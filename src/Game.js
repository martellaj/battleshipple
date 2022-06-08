import { useCallback, useState } from "react";
import "./Game.css";
import getShipCoords from "./helpers/getShipCoords";

function Game() {
  const shipCoords = getShipCoords(); // [{x, y}]

  const [selectedTile, setSelectedTile] = useState(null);
  const [missedShots, setMissedShots] = useState([{ x: 0, y: 0 }]);
  const [hitShots, setHitShots] = useState([{ x: 0, y: 1 }]);

  const onTileClicked = useCallback(
    (x, y) => {
      if (selectedTile && x === selectedTile.x && y === selectedTile.y) {
        setSelectedTile(null);
      } else {
        setSelectedTile({ x, y });
      }
    },
    [selectedTile]
  );

  function Tile(tileProps) {
    const { x, y, state, onClicked } = tileProps;

    const isSelected =
      selectedTile && selectedTile.x === x && selectedTile.y === y;
    const isInFirstRow = y === 0;
    const isMissedShot = missedShots.some(
      (shot) => shot.x === x && shot.y === y
    );
    const isHitShot = hitShots.some((shot) => shot.x === x && shot.y === y);

    return (
      <div
        className={`tile ${isSelected && "tile--selected"} ${
          isInFirstRow && "tile--first-row"
        } ${isMissedShot && "tile--missed"} ${isHitShot && "tile--hit"}`}
        onClick={() => onClicked(x, y)}
      >
        🌊
      </div>
    );
  }

  return (
    <div className="gameContainer">
      <div className="boardRow">
        <Tile onClicked={onTileClicked} x={0} y={0} />
        <Tile onClicked={onTileClicked} x={1} y={0} />
        <Tile onClicked={onTileClicked} x={2} y={0} />
        <Tile onClicked={onTileClicked} x={3} y={0} />
        <Tile onClicked={onTileClicked} x={4} y={0} />
      </div>
      <div className="boardRow">
        <Tile onClicked={onTileClicked} x={0} y={1} />
        <Tile onClicked={onTileClicked} x={1} y={1} />
        <Tile onClicked={onTileClicked} x={2} y={1} />
        <Tile onClicked={onTileClicked} x={3} y={1} />
        <Tile onClicked={onTileClicked} x={4} y={1} />
      </div>
      <div className="boardRow">
        <Tile onClicked={onTileClicked} x={0} y={2} />
        <Tile onClicked={onTileClicked} x={1} y={2} />
        <Tile onClicked={onTileClicked} x={2} y={2} />
        <Tile onClicked={onTileClicked} x={3} y={2} />
        <Tile onClicked={onTileClicked} x={4} y={2} />
      </div>
      <div className="boardRow">
        <Tile onClicked={onTileClicked} x={0} y={3} />
        <Tile onClicked={onTileClicked} x={1} y={3} />
        <Tile onClicked={onTileClicked} x={2} y={3} />
        <Tile onClicked={onTileClicked} x={3} y={3} />
        <Tile onClicked={onTileClicked} x={4} y={3} />
      </div>
      <div className="boardRow">
        <Tile onClicked={onTileClicked} x={0} y={4} />
        <Tile onClicked={onTileClicked} x={1} y={4} />
        <Tile onClicked={onTileClicked} x={2} y={4} />
        <Tile onClicked={onTileClicked} x={3} y={4} />
        <Tile onClicked={onTileClicked} x={4} y={4} />
      </div>
    </div>
  );
}

export default Game;
