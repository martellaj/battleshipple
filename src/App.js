import "./App.css";
import Game from "./Game";
import Header from "./Header";

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
          marginBottom: "24px",
          color: "#038eca !important",
          fontSize: "20px",
        }}
        href="https://twitter.com/battleshipple"
        target="_blank"
        rel="noreferrer"
      >
        @battleshipple
      </a>
    </div>
  );
}

export default App;
