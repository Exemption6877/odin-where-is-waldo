import { Link } from "react-router-dom";

// Will fetch API for all options here later.

function GameboardChoice() {
  return (
    <ul>
      <li>
        <Link>Gameboard 1</Link>
      </li>
      <li>
        <Link>Gameboard 2</Link>
      </li>
      <li>
        <Link>Gameboard 3</Link>
      </li>
    </ul>
  );
}

export default GameboardChoice;
