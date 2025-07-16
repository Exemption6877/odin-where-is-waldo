import styles from "./Mouse.module.css";
import MouseForm from "./MouseForm";

// Choice list will be a form that will confirm "hit" with backend

function Mouse({ position, options, onClick }) {
  return (
    <div
      className={styles.popupContainer}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className={styles.circle}></div>
      <MouseForm options={options} onClick={onClick} />
    </div>
  );
}

export default Mouse;
