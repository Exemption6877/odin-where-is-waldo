import styles from "./GameObjectives.module.css";
import Draggable from "react-draggable";
import { useRef } from "react";

function GameObjectives({ objectives }) {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div ref={nodeRef} className={styles.objectivesWrapper}>
        <h3>Objectives</h3>
        {objectives.map((objective) => (
          <div key={objective.id} className={styles.objectiveWrapper}>
            <img src={objective.image} alt={objective.title} />
          </div>
        ))}
      </div>
    </Draggable>
  );
}

export default GameObjectives;
