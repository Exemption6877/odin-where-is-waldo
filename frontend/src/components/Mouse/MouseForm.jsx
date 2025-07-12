import styles from "./Mouse.module.css";

function MouseForm({ options }) {
  return (
    <div className={styles.choiceList}>
      {options.map((option, index) => (
        <button key={index} value={`${option}`}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default MouseForm;
