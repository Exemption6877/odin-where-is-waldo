import { Link } from "react-router-dom";
import styles from "./GameboardChoice.module.css";

// Will fetch API for all options here later.
// Put original link in db as well

function GameboardChoice() {
  return (
    <ul className={styles.choiceWrapper}>
      <li>
        <img src={`/assets/gameboard-preview/gm-1-preview.jpg`} alt="" />
        <p>
          By: u/Chekavo{" "}
          <a href="https://www.reddit.com/r/wimmelbilder/comments/d8lioz/ad_2222_character_poster_oc_finaly_done/">
            (Link)
          </a>
        </p>
        <Link to="/game/1">Gameboard 1</Link>
      </li>
      <li>
        <img src={`/assets/gameboard-preview/gm-2-preview.jpeg`} alt="" />
        <p>
          By: <a href=""></a>
        </p>
        <Link>Gameboard 2</Link>
      </li>
      <li>
        <img src={`/assets/gameboard-preview/gm-3-preview.jpeg`} alt="" />
        <p>
          By: <a href=""></a>
        </p>
        <Link>Gameboard 3</Link>
      </li>
    </ul>
  );
}

export default GameboardChoice;
