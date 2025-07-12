import styles from "./GameObjectives.module.css";

function GameObjectives({ objectives }) {
  return (
    <div className={styles.objectivesWrapper}>
      {objectives.map((objective) => (
        <div key={objective.index} className={styles.objectiveWrapper}>
          <p>{objective.name}</p>
          <img src={`${objective.image}`} />
        </div>
      ))}
    </div>
  );
}

export default GameObjectives;
