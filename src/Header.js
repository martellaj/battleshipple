import "./Header.css";
import { Icon } from "semantic-ui-react";

function Header() {
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
    </>
  );
}

export default Header;
