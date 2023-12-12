const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5500;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../my-react-app/build")));

// API endpoint
app.get("/callback", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Catch-all route to serve 'index.html' for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-react-app/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
