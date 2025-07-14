import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameObjectives from "./GameObjectives";
import SendScore from "./SendScore";
import Mouse from "../Mouse/Mouse";
import styles from "./Gameboard.module.css";
import useFetch from "../../hooks/useFetch";

const API_URL = import.meta.env.VITE_API_URL;

function Gameboard() {
  const { gameId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  // const [gameFinished, setGameFinished] = useState(false);

  const gameboard = useFetch(`${API_URL}/gameboard/${gameId}/`);
  const objectives = useFetch(
    `${API_URL}/gameboard/${gameId}/objective/random`
  );

  const endGame = () => {
    // Some logic to tell API to stop timer.
    // API checks for all found images then returns something that stops the game and sets state.
  };

  const gmInteraction = (e) => {
    const targetElem = e.target.getBoundingClientRect();
    const userInput = [
      (e.clientX - targetElem.left) / targetElem.width,
      (e.clientY - targetElem.top) / targetElem.height,
    ];

    console.log(userInput);
    setShowMenu(true);
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // handleMouseButtonClick, need adjust api to be able to receive objective id

  // object's coords are 4 points
  // I will implement server check on hits
  // Coordinates will not be sent in this object, as its status, only index, name, image

  // Close popup on mousescroll
  useEffect(() => {
    const handleScroll = () => {
      setShowMenu(false);
    };
    window.addEventListener("wheel", handleScroll);
  }, []);

  if (gameboard.loading) return <p>Loading...</p>;
  if (gameboard.error) return <p>Error: {gameboard.error.message}</p>;

  if (objectives.loading) return <p>Loading...</p>;
  if (objectives.error) return <p>Error: {objectives.error.message}</p>;

  return (
    <div className={styles.gameboardWrapper}>
      <h1>{gameboard.data.title}</h1>

      {showMenu && <Mouse position={mousePos} options={objectives.data} />}
      <GameObjectives objectives={objectives.data} />
      <img onClick={gmInteraction} src={gameboard.data.image} alt="gameboard" />
    </div>
  );
}

export default Gameboard;
