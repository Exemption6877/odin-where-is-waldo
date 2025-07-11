import { useState } from "react";
import { useParams } from "react-router-dom";
import GameObjectives from "./GameObjectives";

function Gameboard() {
  const { gameId } = useParams();
  const [coordinates, setCoordinates] = useState([]);

  const getCoordinates = (e) => {
    const targetElem = e.target.getBoundingClientRect();
    const userInput = [e.clientX - targetElem.left, e.clientY - targetElem.top];

    setCoordinates(userInput);

    objectives.forEach((objective) => {
      if (checkHit(userInput, objective.coordinates)) objective.found = true;
      console.log(objectives);
    });

    console.log(checkHit(userInput, objectives[0].coordinates));
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
