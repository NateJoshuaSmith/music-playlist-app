const express = require("express");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5500; // Use any available port

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const clientId = "164dceed83f04c21b21d198d94443ba9";
const clientSecret = "1543f6f5bd4c4b3f8dcd751a6ac18467";
const redirectUri = "http://localhost:5500/callback"; // Adjust as needed

// Step 1: Redirect to Spotify for Authorization
app.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email"; // Add the required scopes

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
    })}`
  );
});

// Step 2: Handle the Callback from Spotify
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  if (!code) {
    res.status(400).send("Error: Missing authorization code");
    return;
  }

  // Step 3: Exchange the authorization code for an access token
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const authOptions = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const tokenParams = {
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
    const tokenResponse = await axios.post(
      tokenEndpoint,
      querystring.stringify(tokenParams),
      authOptions
    );
    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    // In a real application, you would typically save these tokens securely
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    res.send("Authentication successful! Check the server console for tokens.");
  } catch (error) {
    console.error("Error exchanging code for token:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/searchYoutube", (req, res) => {
  const apiKey = "AIzaSyDnHvs7XhK6610pt4UktfmyK6obkcCFoow";
  const searchTerm = req.body.searchTerm;
  const requestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${apiKey}`;
  console.log(searchTerm);

  // Make the axios call
  axios
    .get(requestUrl)
    .then((response) => {
      // Handle the response data
      const videoId = response.data.items[0].id.videoId;
      res.send(response.data.items[0].id.videoId);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching data from YouTube API:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
