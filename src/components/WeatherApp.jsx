import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import ForecastCard from './ForecastCard';
import CityWeather from './CityWeather';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
const firebaseConfig = {
    apiKey: "AIzaSyDFAQ6omLSUsSWA81l_LSVi83KuRT9NXls",
    authDomain: "comp3421-weather-app.firebaseapp.com",
    projectId: "comp3421-weather-app",
    storageBucket: "comp3421-weather-app.firebasestorage.app",
    messagingSenderId: "1095568196995",
    appId: "1:1095568196995:web:14289d60f69581238c62b6",
    measurementId: "G-29QQ7SQJ4M"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Performance Monitoring and get a reference to the service
const perf = getPerformance(app);
const WeatherApp = () => {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                const forecastResponse = await axios.get(
                    'https://data.weather.gov.hk/weatherAPI/opendata/weather.php',
                    {
                        params: {
                            dataType: 'fnd', // for 9 days forecast
                            lang: 'en' // return English
                        }
                    }
                );

                setForecast(forecastResponse.data.weatherForecast.slice(0, 7)); // get 7 days forecast
            } catch (err) {
                setError('Failed to fetch forecast data');
                console.error(err);
            } finally {
                logEvent(analytics, "page_main");
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <a href=""></a>
            <h1>
                Hong Kong Weather Forecast
            </h1>
            <CurrentWeather />
            <h2>7-Day Forecast</h2>
            <div className="grid">
                {forecast.map((day, index) => (
                    <ForecastCard key={index} day={day} />
                ))}
            </div>
            <CityWeather />
        </div>
    );
};

export default WeatherApp;