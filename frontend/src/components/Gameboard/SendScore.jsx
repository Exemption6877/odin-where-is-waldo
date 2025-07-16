import styles from "./SendScore.module.css";

function SendScore({ time }) {
  // API call that will include time and username

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.scoreForm} onSubmit={handleSubmit}>
      <p>Your time: {time}</p>
      <label htmlFor="username">Your name</label>
      <input type="text" name="username" id="username" />
      <input type="submit" value="Submit score!" />
    </form>
  );
}

export default SendScore;
