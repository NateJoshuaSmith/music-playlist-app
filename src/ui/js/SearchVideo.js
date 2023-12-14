import React, { useState, useRef } from "react";
import ParentComponent from "./ParentComponent";

const SearchVideo = () => {
  const regInput = useRef();
  const [videoId, setVideoId] = useState(null);

  const searchInput = (event) => {
    event.preventDefault();
    const searchTerm = regInput.current.value;

    if (searchTerm) {
      console.log(searchTerm);
      fetch("http://localhost:5500/searchYoutube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          console.log(data);
          setVideoId(data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching data from YouTube API:", error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={searchInput}>
        <label htmlFor="header-search">
          <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
          ref={regInput}
          className="form-input"
          type="search"
          name="search"
          placeholder="Enter your search term"
        />
        <button type="submit">Search</button>
      </form>

      {videoId && <ParentComponent videoId={videoId} />}
    </div>
  );
};

export default SearchVideo;
