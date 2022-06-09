import "./PostGameModal.css";
import { Modal, Button } from "semantic-ui-react";
import { useCallback, useState, useEffect } from "react";

function PostGameModal(props) {
  const [open, setOpen] = useState(true);

  const { score } = props;

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

      <Button size="large" positive={true} className="shareButton">
        SHARE
      </Button>

      <div className="pgRow">best 👑: {best}</div>
      <div className="pgRow">average 💣: {best}</div>
    </Modal>
  );
}

export default PostGameModal;
