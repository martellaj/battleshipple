import "./HelpModal.css";
import { Modal } from "semantic-ui-react";
import { useState } from "react";

function HelpModal(props) {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      id="helpModalContainer"
      className="helpModalContainer"
      onClose={() => {
        props.onClosed();
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <div>👉 Select a spot</div>
      <div>💣 Fire away at that location</div>
      <div>❌ means you missed</div>
      <div>💥 means you hit the battleship</div>
      <div>🏆 Sink the battleship (4 hits) in as few shots as possible</div>
      <div>🕛 New battle at midnight</div>
    </Modal>
  );
}

export default HelpModal;
