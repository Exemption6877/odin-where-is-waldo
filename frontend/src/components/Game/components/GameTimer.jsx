import { useState, useEffect } from "react";

function GameTimer({ status }) {
  const [localTimer, setLocalTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    if (status) return;

    const interval = setInterval(() => {
      setLocalTimer((prev) => {
        let { hours, minutes, seconds } = prev;

        seconds += 1;

        if (seconds === 60) {
          minutes += 1;
          seconds = 0;
        }

        if (minutes === 60) {
          minutes = 0;
          hours += 1;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div>
      <p>
        Timer: {localTimer.hours > 0 ? localTimer.hours + `:` : null}
        {localTimer.minutes > 0 ? localTimer.minutes + `:` : null}
        {localTimer.seconds}
      </p>
    </div>
  );
}

export default GameTimer;
