import { Link } from "react-router-dom";
import styles from "./GameboardChoice.module.css";
import useFetch from "../../hooks/useFetch";

const API_URL = import.meta.env.VITE_API_URL;

function GameboardChoice() {
  const { data, error, loading } = useFetch(`${API_URL}/gameboard`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className={styles.choiceWrapper}>
      {data.map((gameboard) => (
        <li key={gameboard.id}>
          <img src={gameboard.preview} alt={gameboard.title} />
          <p>
            By: {gameboard.author} <a href={gameboard.source}>(Link)</a>
          </p>
          <Link to={`/game/${gameboard.id}`}>{gameboard.title}</Link>
          <Link to={`/game/${gameboard.id}/results`}>Results</Link>
        </li>
      ))}
    </ul>
  );
}

export default GameboardChoice;
