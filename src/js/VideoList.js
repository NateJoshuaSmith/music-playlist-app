// VideoList.js
import React, { useState, useEffect } from "react";
import API_KEY from "./config";
import VideoPlayer from "./VideoPlayer";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=pink+floyd`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from YouTube API");
        }

        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching data from YouTube API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <VideoPlayer key={video.id.videoId} videoId={video.id.videoId} />
      ))}
    </div>
  );
};

export default VideoList;
