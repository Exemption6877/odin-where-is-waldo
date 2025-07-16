import styles from "./SendScore.module.css";

function SendScore({ onSubmit, username, setUsername, time }) {
  // API call that will include time and username

  const handleTyping = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.scoreForm} onSubmit={onSubmit}>
      <p>Your time: {time}</p>
      <label htmlFor="username">Your name</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleTyping}
        value={username}
      />
      <input type="submit" value="Submit score!" />
    </form>
  );
}

export default SendScore;
