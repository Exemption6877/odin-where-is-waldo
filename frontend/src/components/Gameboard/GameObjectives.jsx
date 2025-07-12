import styles from "./GameObjectives.module.css";
import Draggable from "react-draggable";
import { useRef } from "react";

function GameObjectives({ objectives }) {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div ref={nodeRef} className={styles.objectivesWrapper}>
        {objectives.map((objective) => (
          <div key={objective.index} className={styles.objectiveWrapper}>
            <p>{objective.name}</p>
            <img src={`${objective.image}`} />
          </div>
        ))}
      </div>
    </Draggable>
  );
}

export default GameObjectives;
