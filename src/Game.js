import { useCallback, useState, useEffect, useRef } from "react";
import "./Game.css";
import getShipCoords from "./helpers/getShipCoords";
import { Button } from "semantic-ui-react";
import PostGameModal from "./PostGameModal";
import getDailyPuzzleNumber from "./helpers/getDailyPuzzleNumber";

function Game() {
  const shipCoords = getShipCoords(); // [{x, y}]

  const [selectedTile, setSelectedTile] = useState(null);
  const [missedShots, setMissedShots] = useState([]);
  const [hitShots, setHitShots] = useState([]);

  const shotOrder = useRef([]);

  const [shouldPopPostGameModal, setShouldPopPostGameModal] = useState(false);

  useEffect(() => {
    if (hitShots.length === 4) {
      setTimeout(() => {
        setShouldPopPostGameModal(true);
      }, 250);
    }
  }, [hitShots]);

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
      shotOrder.current.push("💥");
      setHitShots([...hitShots, selectedTile]);
    } else {
      shotOrder.current.push("❌");
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
    <>
      <div className="gameContainer">
        <div className="headerSubtext">
          daily battle #{getDailyPuzzleNumber()}
        </div>

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

        {!shouldPopPostGameModal && (
          <Button
            className="fireAwayButton"
            color="red"
            onClick={onFireAwayClicked}
            size="big"
          >
            💣 fire away
          </Button>
        )}
      </div>
      {shouldPopPostGameModal && (
        <PostGameModal
          score={hitShots.length + missedShots.length}
          shotOrder={shotOrder.current.join("")}
        />
      )}
    </>
  );
}

export default Game;
