import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import LoadingSkeleton from "../loading/LoadingSkeleton";

// https://api.themoviedb.org/3/movie/550?api_key=55767760b8b550566ba1d4a0e67868ec
// https://api.themoviedb.org/3/search/movie?api_key=55767760b8b550566ba1d4a0e67868ec&query=''
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg

const MoiveSearchApp = () => {
  const [movies, setMovies] = useState("");
  const [query, setQuery] = useState("");
  const queryDebounce = useDebounce(query, 500);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=55767760b8b550566ba1d4a0e67868ec&query='${queryDebounce}'`
      );
      if (response.data.results) {
        console.log(response.data.results);
        setMovies(response.data.results);
        setLoading(false);
      }
    }
    fetchData();
  }, [queryDebounce]);
  return (
    <div className="p-10">
      <div className="w-full max-w-[500px] mx-auto">
        <input
          type="text"
          placeholder="Search movie..."
          className="w-full p-5 rounded-lg border border-purple-500 shadow-[0px_0px_0px_3px_rgba(125_106,_255,_0.2)]"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {loading && (
        <div className="grid grid-cols-3 gap-10">
          <MovieItemLoading />
          <MovieItemLoading />
          <MovieItemLoading />
        </div>
      )}
      <div className="grid grid-cols-3 gap-10 mt-5">
        {!loading &&
          movies.length > 0 &&
          movies.map((item, index) => <MovieItem key={item.id} data={item} />)}
      </div>
    </div>
  );
};

const MovieItemLoading = () => {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-sm flex flex-col">
      <div className="h-[297px]">
        <LoadingSkeleton width="100%" height="100%" radius="16px" />
      </div>
      <div className="p-7 flex-1 flex flex-col">
        <h3 className="text-lg text-black font-semibold mb-4 !leading-loose">
          <LoadingSkeleton height="20px" />
        </h3>
        <p className="text-[#999] text-sm mb-6">
          <LoadingSkeleton height="50px" />
        </p>
        <div className="flex items-center gap-x-3 mt-auto">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" />
          </svg>
          <span className="text-sm font-semibold text-[#333]">
            <LoadingSkeleton height="10px" width="50px" />
          </span>
        </div>
      </div>
    </div>
  );
};

const MovieItem = (props) => {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-sm flex flex-col">
      <div className="h-[297px]">
        <img
          src={`https://image.tmdb.org/t/p/original/${props.data.poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="p-7 flex-1 flex flex-col">
        <h3 className="text-lg text-black font-semibold mb-4 !leading-loose">
          {props.data.title}
        </h3>
        <p className="text-[#999] text-sm mb-6">{props.data.overview}</p>
        <div className="flex items-center gap-x-3 mt-auto">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" />
          </svg>
          <span className="text-sm font-semibold text-[#333]">
            {props.data.vote_average}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MoiveSearchApp;
