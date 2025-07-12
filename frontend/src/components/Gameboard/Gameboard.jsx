import { useState } from "react";
import { useParams } from "react-router-dom";
import GameObjectives from "./GameObjectives";
import SendScore from "./SendScore";
import Mouse from "../Mouse/Mouse";

function Gameboard() {
  const { gameId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  const [gameFinished, setGameFinished] = useState(false);

  const endGame = () => {
    // Some logic to tell API to stop timer.
    // API checks for all found images then returns something that stops the game and sets state.
  };

  const getCoordinates = (e) => {
    const targetElem = e.target.getBoundingClientRect();
    // const userInput = [e.clientX - targetElem.left, e.clientY - targetElem.top];
    const userInput = [
      e.clientX - targetElem.left + window.scrollX,
      e.clientY - targetElem.top + window.scrollY,
    ];
    setShowMenu(true);
    setMousePos({ x: userInput[0], y: userInput[1] });

    objectives.forEach((objective) => {
      if (checkHit(userInput, objective.coordinates)) objective.found = true;
    });
  };

  const checkHit = (userInput, objectiveCoordinates) => {
    return (
      objectiveCoordinates[0][0] <= userInput[0] &&
      userInput[0] <= objectiveCoordinates[1][0] &&
      objectiveCoordinates[0][1] <= userInput[1] &&
      userInput[1] <= objectiveCoordinates[1][1]
    );
  };

  // object's coords are 4 points
  // I will implement server check on hits
  // Coordinates will not be sent in this object, as its status, only index, name, image
  const [objectives, setObjectives] = useState([
    {
      index: 0,
      name: "Objective 1",
      coordinates: [
        [610, 1430],
        [755, 1635],
      ],
      image: "/assets/objectives/gm-1-1.png",
      found: false,
    },
    {
      index: 1,
      name: "Objective 2",
      coordinates: [
        [379, 2859],
        [433, 2938],
      ],
      image: "/assets/objectives/gm-1-2.png",
      found: false,
    },
  ]);
  // map for each...

  return (
    <div>
      <h1>Gameboard {gameId}</h1>
      {showMenu && <Mouse position={mousePos} />}
      <GameObjectives objectives={objectives} />
      <img
        onClick={getCoordinates}
        src={`/assets/gameboards/gameboard_1.jpg`}
        alt=""
      />
    </div>
  );
}

export default Gameboard;
