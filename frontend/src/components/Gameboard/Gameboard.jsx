import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameObjectives from "./GameObjectives";
import SendScore from "./SendScore";
import Mouse from "../Mouse/Mouse";
import styles from "./Gameboard.module.css";
import useFetch from "../../hooks/useFetch";
import { intervalToDuration } from "date-fns";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Gameboard() {
  const navigate = useNavigate();

  const { gameId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: null,
    y: null,
    normX: null,
    normY: null,
  });

  const [finish, setFinish] = useState(false);
  const [scoreData, setScoreData] = useState({
    time: null,
    username: "",
    format: null,
  });

  const [objLoading, setObjLoading] = useState(true);
  const [objError, setObjError] = useState(null);
  const [objectives, setObjectives] = useState([]);

  const gameboard = useFetch(`${API_URL}/gameboard/${gameId}/`);

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const res = await fetch(
          `${API_URL}/gameboard/${gameId}/objective/random`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await res.json();

        setObjLoading(false);
        if (!res.ok) {
          setObjError(data);
        }

        setObjectives(data);
      } catch (err) {
        setObjLoading(false);
        setObjError(err);
      }
    };

    fetchObjectives();
  }, [gameId]);

  const endGame = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/gameboard/${gameId}/score`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: scoreData.username,
        time: scoreData.time,
      }),
    });
    navigate("/");
  };

  const gmInteraction = (e) => {
    const targetElem = e.target.getBoundingClientRect();
    const userInput = [
      (e.clientX - targetElem.left) / targetElem.width,
      (e.clientY - targetElem.top) / targetElem.height,
    ];

    setShowMenu(true);
    setMousePos({
      x: e.clientX,
      y: e.clientY,
      normX: userInput[0],
      normY: userInput[1],
    });
  };

  const handleClick = async (optionId) => {
    try {
      const res = await fetch(
        `${API_URL}/gameboard/${gameId}/objective/check/${optionId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userX: mousePos.normX,
            userY: mousePos.normY,
          }),
        }
      );
      const data = await res.json();
      setShowMenu(false);

      if (data.status === "found") {
        setObjectives((prev) =>
          prev.map((obj) =>
            obj.id === optionId ? { ...obj, found: true } : obj
          )
        );
      }
      if (data.status === "Finished") {
        setFinish(true);

        const formattedDate = intervalToDuration({
          start: 0,
          end: data.time,
        });

        setScoreData((prev) => ({
          ...prev,
          time: data.time,
          format: formattedDate,
        }));
      }
    } catch (err) {
      setObjError(err.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowMenu(false);
    };
    window.addEventListener("wheel", handleScroll);
  }, []);

  if (gameboard.loading) return <p>Loading...</p>;
  if (gameboard.error) return <p>Error: {gameboard.error.message}</p>;

  if (objLoading) return <p>Loading...</p>;
  if (objError) return <p>Error: {objError.message}</p>;

  if (finish)
    return (
      <div className={styles.gameboardWrapper}>
        <SendScore
          scoreData={scoreData}
          setScoreData={setScoreData}
          onSubmit={endGame}
        />
      </div>
    );

  return (
    <div className={styles.gameboardWrapper}>
      <h1>{gameboard.data.title}</h1>
      {showMenu && (
        <Mouse position={mousePos} options={objectives} onClick={handleClick} />
      )}
      <GameObjectives status={finish} objectives={objectives} />
      <img onClick={gmInteraction} src={gameboard.data.image} alt="gameboard" />
    </div>
  );
}

export default Gameboard;
