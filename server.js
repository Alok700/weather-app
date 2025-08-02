const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();  // Load .env variables

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
const path = require("path");

// Serve static files (HTML, CSS, JS) from 'public' or the folder in your ZIP
app.use(express.static(path.join(__dirname, "client")));  // Replace "public" if your folder name is different

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY; 
    console.log("API Key:", apiKey);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
