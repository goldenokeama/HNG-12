/* eslint-disable react/prop-types */
export default function ColorButtons(props) {
  // console.log(props);
  const buttonsEl = props.colors.map((color) => (
    <Button key={color} color={color} handleClick={props.handleClick} />
  ));

  return <div className="button-container">{buttonsEl}</div>;
}

function Button({ color, handleClick }) {
  const styles = {
    backgroundColor: color,
  };

  return (
    <button
      style={styles}
      className="color-button"
      onClick={() => handleClick(color)}
      data-testid="colorOption"
    ></button>
  );
}
