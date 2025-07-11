import { useState } from "react";
import { useParams } from "react-router-dom";

function Gameboard() {
  const { gameId } = useParams();
  const [coordinates, setCoordinates] = useState({ x: null, y: null });

  const getCoordinates = (e) => {
    const targetElem = e.target.getBoundingClientRect();

    setCoordinates({
      x: e.clientX - targetElem.left,
      y: e.clientY - targetElem.top,
    });

    console.log(coordinates);
  };

  return (
    <div>
      <h1>Gameboard {gameId}</h1>
      <img onClick={getCoordinates} src={`/assets/gameboard_1.jpg`} alt="" />
    </div>
  );
}

export default Gameboard;
