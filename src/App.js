import ParentComponent from "./ui/js/ParentComponent";
import SearchVideo from "./ui/js/SearchVideo";
import SpotifyAccessToken from "./ui/js/SpotifyAccessToken";
import VideoList from "./ui/js/VideoList";
import YoutubeVideoPlayer from "./ui/js/YoutubePlayer";
import { useState, useRef } from "react";

function App() {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleClick = (videoId) => {
    // setSelectedVideoId(videoId);
    // player.stopVideo();
  };

  return (
    <div>
      <SearchVideo />
    </div>
  );
}

// <SpotifyAccessToken player={player} />}

// {selectedVideoId && <YoutubeVideoPlayer videoId={selectedVideoId} />}
// <button onClick={() => handleClick("9osre3R0LvA")}>Click me!</button>
// <button onClick={() => handleClick("FNBf2yNOzhY")}>Click me 2!</button>

export default App;
