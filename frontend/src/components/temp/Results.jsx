import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { intervalToDuration, formatDistance } from "date-fns";
import styles from "./Results.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function Results() {
  const { gameId } = useParams();

  const { error, loading, data } = useFetch(
    `${API_URL}/gameboard/${gameId}/score`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data.length === 0)
    return (
      <div className={styles.resultsWrapper}>
        <h2>No entries yet!</h2>
      </div>
    );

  const formatted = data.map((entry) => ({
    ...entry,
    format: intervalToDuration({ start: 0, end: entry.time }),
  }));

  return (
    <div className={styles.resultsWrapper}>
      <h2>Recent scores</h2>
      {data.length > 0 &&
        formatted.map((score) => (
          <div className={styles.resultEntry} key={score.id}>
            <h4>{score.username}</h4>
            <p>
              Time: {score.format.hours > 0 ? score.format.hours + `:` : null}
              {score.format.minutes > 0 ? score.format.minutes + `:` : null}
              {score.format.seconds}
              {!score.format.hours && !score.format.minutes ? " seconds" : null}
            </p>

            <p>When: {formatDistance(new Date(), score.createdAt)} ago</p>
          </div>
        ))}
    </div>
  );
}

export default Results;
