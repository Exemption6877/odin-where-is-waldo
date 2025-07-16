import styles from "./SendScore.module.css";

function SendScore({ scoreData, setScoreData, onSubmit }) {
  const handleTyping = (e) => {
    if (e.target.name === "username") {
      setScoreData((prev) => ({ ...prev, username: e.target.value }));
    }
  };

  return (
    <form className={styles.scoreForm} onSubmit={onSubmit}>
      <p>Your time: {scoreData.time}</p>
      <label htmlFor="username">Your name</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleTyping}
        value={scoreData.username}
      />
      <input type="submit" value="Submit score!" />
    </form>
  );
}

export default SendScore;
