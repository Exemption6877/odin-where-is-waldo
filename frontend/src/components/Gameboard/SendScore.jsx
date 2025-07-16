import styles from "./SendScore.module.css";

function SendScore({ scoreData, setScoreData, onSubmit }) {
  const handleTyping = (e) => {
    if (e.target.name === "username") {
      console.log(scoreData);
      setScoreData((prev) => ({ ...prev, username: e.target.value }));
    }
  };

  return (
    <form className={styles.scoreForm} onSubmit={onSubmit}>
      <p>
        Your time:{" "}
        {scoreData.format.hours > 0 ? scoreData.format.hours + `:` : null}
        {scoreData.format.minutes > 0 ? scoreData.format.minutes + `:` : null}
        {scoreData.format.seconds}
        {!scoreData.format.hours && !scoreData.format.minutes
          ? " seconds"
          : null}
      </p>
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
