import styles from "./Mouse.module.css";

function Mouse({ position }) {
  return (
    <div
      className={styles.popupContainer}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={styles.circle}></div>
      <ul className={styles.choiceList}>
        <li>Waldo</li>
        <li>Wizzard</li>
      </ul>
    </div>
  );
}

export default Mouse;
