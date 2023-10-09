import styles from "../styles/vector.module.css";
import vectorUp from "../images/vector_up.png";
import vectorDown from "../images/vector_down.png";

const Vector = (props) => {
  const { name } = props;
  return (
    <img
      style={
        name === "vectorUp"
          ? { top: "64px" }
          : { top: window.innerHeight - 250 + "px" }
      }
      className={name === "vectorUp" ? styles.vectorUp : styles.vectorDown}
      src={name === "vectorUp" ? vectorUp : vectorDown}
      alt=""
    />
  );
};

export default Vector;
