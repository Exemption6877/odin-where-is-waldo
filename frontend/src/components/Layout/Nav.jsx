import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <h2>A Photo Tagging Game</h2>
      <ul>
        <li>
          <p>Home</p>
        </li>
        <li>
          <Link to="choice">Choose level</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
