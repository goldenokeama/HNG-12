export default function Color(prop) {
  // console.log(prop);
  return (
    <div className="guess-color-container">
      <h2 data-testid="gameInstructions">Guess the Correct Color!</h2>

      <div
        className="guess-color"
        style={prop.styles}
        data-testid="colorBox"
      ></div>
    </div>
  );
}
