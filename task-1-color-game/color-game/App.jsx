import React from "react";
import Color from "./components/Color";
import ColorButtons from "./components/ColorButtons";

import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A8",
  "#A833FF",
  "#33FFF5",
];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return {
    backgroundColor: colors[randomIndex],
  };
}

export default function App() {
  const [score, setScore] = React.useState(0);
  const [styles, setStyles] = React.useState(() => getRandomColor());

  const [newColor, setNewColor] = React.useState(true);
  const [message, setMessage] = React.useState("");

  const [isCorrect, setIsCorrect] = React.useState(false);

  const { width, height } = useWindowSize();

  function hideColor() {
    setTimeout(() => {
      setStyles((prev) => ({ ...prev, visibility: "hidden" }));
      setNewColor(false);
    }, 1600);
  }

  React.useEffect(() => {
    hideColor();
  }, []);

  function gameContinue() {
    setStyles((prev) => ({ ...prev, visibility: "visible" }));

    setTimeout(() => {
      setStyles(getRandomColor());
      // setIsCorrect(false);

      setNewColor(true);

      setMessage("");

      setTimeout(() => {
        setStyles((prev) => ({ ...prev, visibility: "hidden" }));
        setNewColor(false);
        setIsCorrect(false);
      }, 1600);
    }, 600);
  }

  function handleColorClick(clickedColor) {
    if (clickedColor === styles.backgroundColor) {
      setMessage("CORRECT! 🎉");
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);

      gameContinue();
    } else {
      setMessage("WRONG! ❌");
      setIsCorrect(false);
      setScore((prevScore) => prevScore - 1);
      gameContinue();
    }
  }

  function handleReset() {
    setScore(0);
    setMessage("");
    setStyles(getRandomColor());
    setNewColor(true);

    setIsCorrect(false);

    hideColor();
  }

  return (
    <div className="container">
      {isCorrect && (
        <Confetti
          recycle={false}
          numberOfPieces={150}
          width={width}
          height={height}
        />
      )}

      <div>
        <h2 data-testid="score">SCORE: {score} </h2>
      </div>

      <Color styles={styles} />

      {!newColor ? (
        <h3 style={{ visibility: "hidden" }}>...</h3>
      ) : (
        <h3>NEW COLOR ! 💥</h3>
      )}

      {message === "" ? (
        <h2 style={{ visibility: "hidden" }} className="guess-message">
          ........
        </h2>
      ) : (
        <h2 className="guess-message" data-testid="gameStatus">
          YOU ARE {message}
        </h2>
      )}

      <ColorButtons colors={colors} handleClick={handleColorClick} />

      <button
        onClick={handleReset}
        className="new-game"
        data-testid="newGameButton"
      >
        New Game
      </button>
    </div>
  );
}
