import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useHackerNewsAPI(initialUrl, initialData) {
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState("react");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleFetchData = useRef({});
  const [url, setUrl] = useState(initialUrl);
  handleFetchData.current = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data?.hits || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`The error happend: ${error}`);
    }
  };

  useEffect(() => {
    handleFetchData.current();
  }, [url]);

  return {
    data,
    query,
    setQuery,
    setUrl,
    loading,
    error,
  };
}
