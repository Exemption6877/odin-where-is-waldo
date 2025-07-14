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

  const [objLoading, setObjLoading] = useState(true);
  const [objError, setObjError] = useState(null);
  const [objectives, setObjectives] = useState([]);

  // const [gameFinished, setGameFinished] = useState(false);

  const gameboard = useFetch(`${API_URL}/gameboard/${gameId}/`);

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const res = await fetch(
          `${API_URL}/gameboard/${gameId}/objective/random`
        );

        const data = await res.json();
        setObjLoading(false);
        if (!res.ok) {
          setObjError(data);
        }
        console.log(data);
        setObjectives(data);
      } catch (err) {
        setObjLoading(false);
        setObjError(err);
      }
    };

    fetchObjectives();
  }, [gameId]);

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

  const handleClick = async (optionId) => {
    try {
      const res = await fetch(
        `${API_URL}/gameboard/${gameId}/objective/check/${optionId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userX: mousePos.x,
            userY: mousePos.y,
          }),
        }
      );

      const data = await res.json();

      console.log(data);
    } catch (err) {
      console.error(err);
    }
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

  if (objLoading) return <p>Loading...</p>;
  if (objError) return <p>Error: {objError.message}</p>;

  return (
    <div className={styles.gameboardWrapper}>
      <h1>{gameboard.data.title}</h1>

      {showMenu && (
        <Mouse position={mousePos} options={objectives} onClick={handleClick} />
      )}
      <GameObjectives objectives={objectives} />
      <img onClick={gmInteraction} src={gameboard.data.image} alt="gameboard" />
    </div>
  );
}

export default Gameboard;
