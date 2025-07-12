import { Link } from "react-router-dom";
import styles from "./Greeting.module.css";

function Greeting() {
  return (
    <div className={styles.greetingContainer}>
      <Link to="/choice">Start Game</Link>
    </div>
  );
}

export default Greeting;
