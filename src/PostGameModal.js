import "./PostGameModal.css";
import { Modal, Button } from "semantic-ui-react";
import { useState } from "react";
import copy from "copy-to-clipboard";
import getDailyPuzzleNumber from "./helpers/getDailyPuzzleNumber";

function PostGameModal(props) {
  const [open, setOpen] = useState(true);

  const [buttonText, setButtonText] = useState("SHARE");

  const { score, shotOrder } = props;

  const best = window.localStorage.getItem("bestScore");

  return (
    <Modal
      closeIcon
      id="postGameModalContainer"
      className="postGameModalContainer"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <div className="pgHeader">You sunk the battleship!</div>

      <div style={{ fontSize: "30px" }}>💣</div>

      <span className="pgScore">{score} shots</span>

      <div
        style={{
          fontSize: "30px",
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          wordBreak: "break-all",
        }}
      >
        {shotOrder}
      </div>

      <Button
        size="large"
        positive={true}
        className="shareButton"
        onClick={() => {
          let text = `#Battleshipple ${getDailyPuzzleNumber()}\n\n${score}/25\n${shotOrder}\n\nhttps://battleshipple.com`;
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

            setButtonText("COPIED!");

            setTimeout(() => {
              setButtonText("SHARE");
            }, 2000);
          }
        }}
      >
        {buttonText}
      </Button>

      {/* <div className="pgRow" style={{ marginBottom: "2px" }}>
        👑 : {best}
      </div>
      <div className="pgRow" style={{ fontSize: "14px" }}>
        (best score)
      </div> */}
    </Modal>
  );
}

export default PostGameModal;
