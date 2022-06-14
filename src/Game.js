import { useCallback, useState, useEffect, useRef } from "react";
import "./Game.css";
import getShipCoords from "./helpers/getShipCoords";
import { Button } from "semantic-ui-react";
import PostGameModal from "./PostGameModal";
import getDailyPuzzleNumber from "./helpers/getDailyPuzzleNumber";

function Game() {
  const shipCoords = useRef(getShipCoords(getDailyPuzzleNumber())); // [{x, y}]

  const [tileWidth, setTileWidth] = useState(null);

  useEffect(() => {
    const tile = document.getElementsByClassName("tile")[0];
    setTileWidth(`${tile.offsetWidth}px`);

    requestAnimationFrame(() => {
      const tile = document.getElementsByClassName("tile")[0];
      setTileWidth(`${tile.offsetWidth}px`);
    });
  }, []);

  const [selectedTile, setSelectedTile] = useState(null);
  const [missedShots, setMissedShots] = useState(() => {
    const missedShots = window.localStorage.getItem(
      `missedShots-${getDailyPuzzleNumber()}`
    );
    return missedShots ? JSON.parse(missedShots) : [];
  });
  const [hitShots, setHitShots] = useState(() => {
    const hitShots = window.localStorage.getItem(
      `hitShots-${getDailyPuzzleNumber()}`
    );
    return hitShots ? JSON.parse(hitShots) : [];
  });

  const shotOrder = useRef(
    window.localStorage.getItem(`shotOrder-${getDailyPuzzleNumber()}`)
      ? JSON.parse(
          window.localStorage.getItem(`shotOrder-${getDailyPuzzleNumber()}`)
        )
      : []
  );

  const [shouldPopPostGameModal, setShouldPopPostGameModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShouldPopPostGameModal(hitShots.length === 3);
    }, 1000);
  }, []);

  useEffect(() => {
    if (hitShots.length === 3) {
      const best = window.localStorage.getItem("bestScore");
      if (best) {
        const _best = parseInt(best);
        window.localStorage.setItem(
          "bestScore",
          Math.min(hitShots.length + missedShots.length, _best)
        );
      } else {
        window.localStorage.setItem(
          "bestScore",
          hitShots.length + missedShots.length
        );
      }

      setTimeout(() => {
        setShouldPopPostGameModal(true);
      }, 250);
    }
  }, [hitShots, missedShots]);

  const onTileClicked = (x, y) => {
    onFireAwayClicked(x, y);
  };

  const onFireAwayClicked = useCallback(
    (x, y) => {
      const isHitShot = hitShots.some((shot) => shot.x === x && shot.y === y);
      const isMissedShot = missedShots.some(
        (shot) => shot.x === x && shot.y === y
      );

      if (isHitShot || isMissedShot) {
        return;
      }

      const audio = new Audio('/shoot.wav');
      audio.play();

      const isHit = shipCoords.current?.some(
        (shot) => shot.x === x && shot.y === y
      );

      if (isHit) {
        shotOrder.current.push("💥");
        setHitShots([...hitShots, { x, y }]);

        window.localStorage.setItem(
          `hitShots-${getDailyPuzzleNumber()}`,
          JSON.stringify([...hitShots, { x, y }])
        );
      } else {
        shotOrder.current.push("❌");
        setMissedShots([...missedShots, { x, y }]);

        window.localStorage.setItem(
          `missedShots-${getDailyPuzzleNumber()}`,
          JSON.stringify([...missedShots, { x, y }])
        );
      }

      window.localStorage.setItem(
        `shotOrder-${getDailyPuzzleNumber()}`,
        JSON.stringify(shotOrder.current)
      );
    },
    [missedShots, hitShots, shipCoords]
  );

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
        style={{ height: tileWidth }}
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
          {getDailyPuzzleNumber() < 100 ? "daily " : ""}battle #
          {getDailyPuzzleNumber()}
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

        {/* {!shouldPopPostGameModal && (
          <Button
            className="fireAwayButton"
            color="red"
            onClick={onFireAwayClicked}
            size="big"
          >
            💣 fire away
          </Button>
        )} */}
      </div>
      {shouldPopPostGameModal && (
        <PostGameModal
          score={hitShots.length + missedShots.length}
          shotOrder={shotOrder.current?.join?.("")}
        />
      )}
    </>
  );
}

export default Game;
