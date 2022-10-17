import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
// import lodash from "lodash";

const HackerNews = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("react");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleFetchData = useRef({});
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query=${query}`
  );
  handleFetchData.current = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setHits(response.data?.hits || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`The error happend: ${error}`);
    }
  };

  useEffect(() => {
    handleFetchData.current();
  }, [url]);

  return (
    <div className="bg-white mx-auto mt-5 p-5 shadow-md w-1/2">
      <div className="flex mb-5 gap-x-5">
        <input
          type="text"
          className="border border-gray-50 p-5  block w-full rounded-md focus:border-blue-500 transition-all"
          placeholder="Typing your keyword..."
          defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="p-5 bg-blue-500 text-white rounded-md"
          onClick={() =>
            setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
          }
        >
          Fetching
        </button>
      </div>

      {loading && (
        <div className="loading w-8 h-8 rounded-full border-blue-500 border-4 border-r-4 border-r-transparent animate-spin mx-auto my-10"></div>
      )}
      {!loading && error && <div>{error}</div>}
      <div className="flex flex-wrap gap-5">
        {!loading &&
          hits.length > 0 &&
          hits.map((item, index) => {
            if (!item.title || item.title.length <= 0) return null;
            return (
              <h3 className="p-3 bg-gray-100 rounded-md" key={item.title}>
                {item.title}
              </h3>
            );
          })}
      </div>
    </div>
  );
};

export default HackerNews;
