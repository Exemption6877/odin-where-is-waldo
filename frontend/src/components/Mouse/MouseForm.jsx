import styles from "./Mouse.module.css";

function MouseForm({ options }) {
  return (
    <div className={styles.choiceList}>
      {options.map((option, index) => (
        <button key={index} value={`${option.id}`}>
          <img src={option.image} alt={`option ${index + 1}`} />
        </button>
      ))}
    </div>
  );
}

export default MouseForm;
