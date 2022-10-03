import React, { useEffect, useState } from "react";
import axios from "axios";

//https://picsum.photos/v2/list

const getPhotos = (page) => {
  return axios
    .get(`https://picsum.photos/v2/list?page=${page}&limit=8`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [nextPages, setNextPages] = useState(1);
  const handleLoadMorePhotos = () => {
    getPhotos(nextPages).then((image) => {
      const newPhotos = [...photos, ...image];
      setPhotos(newPhotos);
      setNextPages(nextPages + 1);
    });
  };
  useEffect(() => {
    handleLoadMorePhotos();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4 gap-5 p-5">
        {photos.length > 0 &&
          photos.map((item, index) => (
            <div
              className="p-3 bg-white shadow-md rounded-lg h-[200px]"
              key={item.id}
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                src={item.download_url}
                alt={item.author}
              />
            </div>
          ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleLoadMorePhotos}
          className="bg-purple-600 text-white p-4 mb-2 font-bold rounded-lg"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Photos;
