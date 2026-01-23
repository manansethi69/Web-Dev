require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5002 || 5003 || 5004; //just in case one doesnt work
const projects = require("../public/projects.json");

app.use(cors());
app.use(express.json());

// Get my projects
app.get("/api/projects", (req, res) => {
    res.json(projects);
});

// Getting weather data from OpenWeather API
app.get("/api/weather", async (req, res) => {
    try {
        const city = req.query.city || "Halifax";
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
        console.log("Fetching from:", API_URL);

        const response = await axios.get(API_URL);
        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
        });
    } catch (error) {
        console.error("Weather API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch weather data. Check API key and internet connection." });
    }
});

// Handling Server Errors
app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// starting the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// 404 Errors
app.use((req, res, next) => {
    res.status(404).json({ error: "Route Not Found" });
});


