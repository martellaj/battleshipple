import { useCallback, useState } from "react";
import "./Game.css";
import getShipCoords from "./helpers/getShipCoords";
import { Button } from "semantic-ui-react";

function Game() {
  const shipCoords = getShipCoords(); // [{x, y}]

  const [selectedTile, setSelectedTile] = useState(null);
  const [missedShots, setMissedShots] = useState([]);
  const [hitShots, setHitShots] = useState([]);

  const onTileClicked = useCallback(
    (x, y) => {
      const isMissedShot = missedShots.some(
        (shot) => shot.x === x && shot.y === y
      );
      const isHitShot = hitShots.some((shot) => shot.x === x && shot.y === y);

      if (isMissedShot || isHitShot) {
        setSelectedTile(null);
      } else if (selectedTile && x === selectedTile.x && y === selectedTile.y) {
        setSelectedTile(null);
      } else {
        setSelectedTile({ x, y });
      }
    },
    [selectedTile, hitShots, missedShots]
  );

  const onFireAwayClicked = useCallback(() => {
    if (!selectedTile) {
      return;
    }

    const isHit = shipCoords.some(
      (shot) => shot.x === selectedTile.x && shot.y === selectedTile.y
    );

    if (isHit) {
      setHitShots([...hitShots, selectedTile]);
    } else {
      setMissedShots([...missedShots, selectedTile]);
    }
  }, [selectedTile, missedShots, hitShots, shipCoords]);

  function Tile(tileProps) {
    const { x, y, onClicked } = tileProps;

    const isSelected =
      selectedTile && selectedTile.x === x && selectedTile.y === y;
    const isInFirstRow = y === 0;
    const isMissedShot = missedShots.some(
      (shot) => shot.x === x && shot.y === y
    );
    const isHitShot = hitShots.some((shot) => shot.x === x && shot.y === y);

    let content = "🌊";
    if (isMissedShot) {
      content = "❌";
    } else if (isHitShot) {
      content = "💥";
    }

    return (
      <div
        className={`tile ${isSelected && "tile--selected"} ${
          isInFirstRow && "tile--first-row"
        } ${isMissedShot && "tile--missed"} ${isHitShot && "tile--hit"}`}
        onClick={() => onClicked(x, y)}
      >
        {content}
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

      <Button
        className="fireAwayButton"
        color="red"
        onClick={onFireAwayClicked}
      >
        💣 fire away
      </Button>
    </div>
  );
}

export default Game;
