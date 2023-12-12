import React, { useState, useEffect } from "react";

const SpotifyAccessToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authenticateSpotify = async () => {
      const clientId = "164dceed83f04c21b21d198d94443ba9";
      const redirectUri = "http://localhost:5500/callback";
      const scope = "user-read-private user-read-email"; // Add required scopes

      // Check if the user has been redirected back with the access token
      const params = new URLSearchParams(window.location.search);
      const receivedToken = params.get("access_token");

      if (receivedToken) {
        setToken(receivedToken);
      } else {
        // Redirect the user to Spotify for authorization
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
      }
    };

    authenticateSpotify();
  }, []);

  return (
    <div>
      <h1>Spotify Authentication</h1>
      {token ? (
        <div>
          <p>Authentication successful!</p>
          {/* Display Spotify data or make API calls using the obtained access token */}
        </div>
      ) : (
        <p>Authenticating...</p>
      )}
    </div>
  );
};

export default SpotifyAccessToken;
