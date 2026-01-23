import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ theme }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5002/api/weather?city=Halifax")
            .then((response) => {
                setWeather(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Weather data unavailable. Try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center">Loading weather...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    return (
        <section className={`container text-center splash ${theme}-mode`}>
            <h2 className="weather-title">Weather in {weather.city}</h2>
            <h4 className="temperature">🌡 {weather.temperature}°C</h4>
            <h4> Humidity: {weather.humidity}%</h4>
        </section>
    );
};

export default Weather;
