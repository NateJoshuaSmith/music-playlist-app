import React, { useEffect, useRef } from "react";

const YoutubePlayer = ({ videoId, onPlayerChange }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    return () => {
      if (playerRef.current && isPlayerReady) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  let isPlayerReady = false;

  const createPlayer = () => {
    playerRef.current = new window.YT.Player("player", {
      height: "390",
      width: "640",
      videoId: videoId || "M7lc1UVf-VE",
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    //added code
    if (onPlayerChange) {
      onPlayerChange(playerRef.current);
    }

    isPlayerReady = true;
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  let done = false;
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  };

  const stopVideo = () => {
    if (
      playerRef.current &&
      typeof playerRef.current.stopVideo === "function"
    ) {
      playerRef.current.stopVideo();
    }
  };

  return <div id="player"></div>;
};

export default YoutubePlayer;

// import React, { useEffect } from "react";

// // Flag to track whether the YouTube API script has been loaded
// let isScriptLoaded = false;

// const YoutubePlayer = ({ videoId }) => {
//   useEffect(() => {
//     // Load the YouTube IFrame Player API script if not already loaded
//     if (!isScriptLoaded) {
//       const tag = document.createElement("script");
//       tag.src = "https://www.youtube.com/iframe_api";
//       const firstScriptTag = document.getElementsByTagName("script")[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//       isScriptLoaded = true;
//     }

//     let player;

//     // Create the YouTube player when the API script is ready
//     window.onYouTubeIframeAPIReady = () => {
//       player = new window.YT.Player("player", {
//         height: "390",
//         width: "640",
//         videoId: videoId || "M7lc1UVf-VE",
//         playerVars: {
//           playsinline: 1,
//         },
//         events: {
//           onReady: onPlayerReady,
//           onStateChange: onPlayerStateChange,
//         },
//       });
//     };

//     const onPlayerReady = (event) => {
//       event.target.playVideo();
//     };

//     let done = false;
//     const onPlayerStateChange = (event) => {
//       if (event.data === window.YT.PlayerState.PLAYING && !done) {
//         setTimeout(stopVideo, 6000);
//         done = true;
//       }
//     };

//     const stopVideo = () => {
//       player.stopVideo();
//       player.loadVideoById(videoId, 1000);
//     };

//     console.log("funky funk");

//     // Cleanup function
//     return () => {
//       // Remove the dynamically added script tag
//       const scriptTag = document.getElementById("iframe-api-script");

//       if (scriptTag) {
//         scriptTag.remove();
//       }

//       // Remove the global function
//       delete window.onYouTubeIframeAPIReady;
//     };
//   }, [videoId]);

//   return <div id="player"></div>;
// };

// export default YoutubePlayer;

// import React, { useEffect } from "react";

// const YoutubePlayer = ({ videoId }) => {
//   useEffect(() => {
//     // 1. Load the IFrame Player API code asynchronously
//     const tag = document.createElement("script");
//     tag.src = "https://www.youtube.com/iframe_api";
//     const firstScriptTag = document.getElementsByTagName("script")[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     let player;

//     // 2. This function creates an <iframe> (and YouTube player) after the API code downloads.
//     window.onYouTubeIframeAPIReady = () => {
//       player = new window.YT.Player("player", {
//         height: "390",
//         width: "640",
//         videoId: "M7lc1UVf-VE",
//         playerVars: {
//           playsinline: 1,
//         },
//         events: {
//           onReady: onPlayerReady,
//           onStateChange: onPlayerStateChange,
//         },
//       });
//     };

//     // 3. The API will call this function when the video player is ready.
//     const onPlayerReady = (event) => {
//       event.target.playVideo();
//     };

//     // 4. The API calls this function when the player's state changes.
//     // The function indicates that when playing a video (state=1),
//     // the player should play for six seconds and then stop.
//     let done = false;
//     const onPlayerStateChange = (event) => {
//       if (event.data === window.YT.PlayerState.PLAYING && !done) {
//         setTimeout(stopVideo, 6000);
//         done = true;
//       }
//     };

//     // 5. This function stops the video.
//     const stopVideo = () => {
//       player.stopVideo();
//       player.loadVideoById(videoId, 1000);
//     };

//     // Cleanup function
//     return () => {
//       // Remove the dynamically added script tag
//       const scriptTag = document.getElementById("iframe-api-script");

//       if (scriptTag) {
//         scriptTag.remove();
//       }

//       // Remove the global function
//       delete window.onYouTubeIframeAPIReady;
//     };
//   }, []);

//   return <div id="player"></div>;
// };

// export default YoutubePlayer;
