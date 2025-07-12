import styles from "./Mouse.module.css";

function Mouse() {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.circle}></div>
      <ul className={styles.choiceList}>
        <li>Waldo</li>
        <li>Wizzard</li>
      </ul>
    </div>
  );
}

export default Mouse;
