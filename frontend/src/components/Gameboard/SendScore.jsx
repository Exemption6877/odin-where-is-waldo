function SendScore({ score }) {
  // API call that will include time and username

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Your score: {score}</p>
      <label htmlFor="username">Your name:</label>
      <input type="text" name="username" id="username" />
      <input type="submit" value="Submit score!" />
    </form>
  );
}

export default SendScore;
