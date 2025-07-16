import styles from "./GameObjectives.module.css";
import Draggable from "react-draggable";
import { useRef } from "react";
import GameTimer from "./GameTimer";

function GameObjectives({ status, objectives }) {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div ref={nodeRef} className={styles.objectivesWrapper}>
        <div className={styles.topObjectives}>
          <h3>Objectives</h3>
          <GameTimer status={status} />
        </div>
        <div className={styles.bottomObjectives}>
          {objectives.map((objective, index) => (
            <div key={objective.id} className={styles.objectiveWrapper}>
              <p>{index + 1}</p>
              <img src={objective.image} alt={objective.title} />
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
}

export default GameObjectives;
