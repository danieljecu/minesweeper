import React from "react";
import ReactDOM from "react-dom";
import { assignMines } from "./Minesweeper";

import "./styles.css";

//

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  // const [grid, setGrid]= useState([[]])

  // console.table(assignMines(4, 5, 5));
  return (
    <div className="App">
      <h1>Minesweeper</h1>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
