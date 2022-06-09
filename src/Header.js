import "./Header.css";
import { Icon } from "semantic-ui-react";
import { useState } from "react";
import HelpModal from "./HelpModal";

function Header() {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <>
      <div className="headerContainer">
        <Icon
          style={{
            cursor: "pointer",
            marginRight: "12px",
            marginLeft: "12px",
          }}
          name="help"
          className="button headerButton"
          onClick={() => setShowHelpModal(true)}
        />
        <span className="headerText">BATTLESHIPPLE</span>
        <Icon
          style={{
            cursor: "pointer",
            marginRight: "12px",
            marginLeft: "12px",
            visibility: "hidden",
          }}
          name="help"
          className="button headerButton"
        />
      </div>
      {showHelpModal && <HelpModal onClosed={() => setShowHelpModal(false)} />}
    </>
  );
}

export default Header;
