import React, { useEffect, useState } from "react";
import YoutubeVideoPlayer from "./YoutubePlayer";

const SpotifyAccessToken = () => {
  // <YoutubeVideoPlayer videoId={videoId} />;
  return (
    <div>
      <h1>Spotify Auth Example</h1>
      <a href="http://localhost:5500/login">Login with Spotify</a>
    </div>
  );
};

export default SpotifyAccessToken;
