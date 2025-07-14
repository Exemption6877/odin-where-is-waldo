import { useEffect, useState } from "react";

function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setData(null);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setLoading(false);
        setData(data);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };

    fetchData();
  }, [url]);

  return { error, loading, data };
}

export default useFetch;
