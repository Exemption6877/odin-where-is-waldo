import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const API_URL = import.meta.env.VITE_API_URL;

function Results() {
  const gameId = useParams();

  const { error, loading, data } = useFetch(
    `${API_URL}/gameboard/${gameId}/score`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h3>Recent scores:</h3>
      {data.map((score) => (
        <div key={score.id}>
          <p>score.username</p>
        </div>
      ))}
    </div>
  );
}

export default Results;
