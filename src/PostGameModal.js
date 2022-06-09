import "./PostGameModal.css";
import { Modal, Button } from "semantic-ui-react";
import { useCallback, useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import getDailyPuzzleNumber from "./helpers/getDailyPuzzleNumber";

function PostGameModal(props) {
  const [open, setOpen] = useState(true);

  const { score, shotOrder } = props;

  const best = 4;

  return (
    <Modal
      id="postGameModalContainer"
      className="postGameModalContainer"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <div className="pgHeader">
        You sunk the battleship in <strong>{score} shots!</strong>
      </div>

      <Button
        size="large"
        positive={true}
        className="shareButton"
        onClick={() => {
          let text = `#Battleshipple ${getDailyPuzzleNumber()}\n\n${shotOrder}\n\nhttps://battleshipple.com`;
          var ua = navigator.userAgent.toLowerCase();
          var isAndroid = ua.indexOf("android") > -1;

          const isIos =
            [
              "iPad Simulator",
              "iPhone Simulator",
              "iPod Simulator",
              "iPad",
              "iPhone",
              "iPod",
            ].includes(navigator.platform) ||
            // iPad on iOS 13 detection
            (navigator.userAgent.includes("Mac") && "ontouchend" in document);

          if (isIos || isAndroid) {
            navigator.share({
              text: text,
            });
          } else {
            copy(text);
          }
        }}
      >
        SHARE
      </Button>

      <div className="pgRow">best 👑: {best}</div>
      <div className="pgRow">average 💣: {best}</div>
    </Modal>
  );
}

export default PostGameModal;
