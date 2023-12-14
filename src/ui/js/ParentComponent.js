import React, { useState, useEffect } from "react";
import YoutubePlayer from "./YoutubePlayer"; // Import your YoutubePlayer component

const ParentComponent = ({ videoId }) => {
  const [player, setPlayer] = useState(null);
  const [buttonsRendered, setButtonsRendered] = useState(false);

  console.log("parentComponent");

  const handlePlayerChange = (newPlayer) => {
    console.log("Player changed:", newPlayer);

    if (newPlayer) {
      console.log("Destroying and setting new player");
      if (player && typeof player.destroy === "function") {
        // player.pauseVideo(); // Pause the video before destroying
        player.destroy();
        setPlayer(null);
      }

      setButtonsRendered(true);
      setPlayer(newPlayer);
    }
  };

  const playVideo = () => {
    // Check if the player is available and has a playVideo method
    if (player && typeof player.playVideo === "function") {
      player.playVideo();
    }
  };

  const pauseVideo = () => {
    // Check if the player is available and has a pauseVideo method
    if (player && typeof player.pauseVideo === "function") {
      player.pauseVideo();
    }
  };

  // ... (other code)
  return (
    <div>
      <YoutubePlayer videoId={videoId} onPlayerChange={handlePlayerChange} />

      {buttonsRendered && player && (
        <div>
          Player is ready! You can control it here:
          <button onClick={playVideo}>Play Video</button>
          <button onClick={pauseVideo}>Pause Video</button>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
