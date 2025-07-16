import styles from "./Mouse.module.css";

function MouseForm({ options, onClick }) {
  return (
    <div className={styles.choiceList}>
      {options.map(
        (option, index) =>
          !option.found && (
            <button key={option.id} onClick={() => onClick(option.id)}>
              <img src={option.image} alt={`option ${index + 1}`} />
            </button>
          )
      )}
    </div>
  );
}

export default MouseForm;
