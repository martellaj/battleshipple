import { Button } from "semantic-ui-react";
import "./App.css";
import Game from "./Game";
import Header from "./Header";

// window.location.href = window.location.origin + window.location.pathname;
window.history.pushState({}, document.title, "/");

// set the app height for mobile
const appHeight = () =>
  document.documentElement.style.setProperty(
    "--app-height",
    `${window.innerHeight}px`
  );
window.addEventListener("resize", appHeight);
appHeight();

function App() {
  return (
    <div className="App">
      <Header />
      <Game />
      <a
        style={{
          marginTop: "auto",
          marginBottom: "12px",
          color: "#038eca !important",
          fontSize: "20px",
        }}
        href="https://twitter.com/battleshipple"
        target="_blank"
        rel="noreferrer"
      >
        @battleshipple
      </a>
      <Button
        style={{
          marginBottom: "12px",
          fontSize: "12px",
        }}
        icon="bomb"
        onClick={() => {
          // window.location.href = `http://localhost:3001/?p=${getRandomInt(
          window.location.href = `https://battleshipple.com/?p=${getRandomInt(
            1000,
            10000
          )}`;
        }}
      />
    </div>
  );
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default App;
