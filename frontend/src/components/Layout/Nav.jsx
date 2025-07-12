import { Link } from "react-router-dom";
import styles from "./Layout.module.css";

function Nav() {
  return (
    <nav className={styles.navContainer}>
      <h2>A Photo Tagging Game</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
