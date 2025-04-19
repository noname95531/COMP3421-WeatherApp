import { useState } from "react";
import axios from "axios";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
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
const CityWeather = () => {
    const [cityName, setcityName] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cityName.trim()) {
            setError('Please enter a city ID');
            return;
        }

        setLoading(true);
        setError(null);
        setWeather(null);
        logEvent(analytics, cityName);
        try {
            const response = await axios.get(
                'https://api.openweathermap.org/data/2.5/weather',
                {
                    params: {
                        q: cityName,
                        appid: '3f023b3a83186f50b57ad24f48ac3519', // Enter API key
                        units: 'metric' // Use Celsius
                    }
                }
            );
            setWeather(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to fetch weather data. Please check the city name.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>
                City Weather Lookup
            </h1>

            {/* Input Form */}
            <div>
                <form onSubmit={handleSubmit} className="flex">
                    <input
                        type="text"
                        value={cityName}
                        onChange={(e) => setcityName(e.target.value)}
                        placeholder="Enter City ID (e.g., London)"

                    />
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Get Weather'}
                    </button>
                </form>
            </div>

            {/* Error Message */}
            {error && (
                <div>
                    {error}
                </div>
            )}

            {/* Weather Display */}
            {weather && (
                <div>
                    <h2>
                        Current Weather in {weather.name}
                    </h2>
                    <div className="grid">
                        <div className="city_weather_div">
                            <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
                            <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                            <p><strong>Humidity:</strong> {weather.main.humidity} %</p>
                            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                            <p>Updated: {new Date(weather.dt * 1000).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex">

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default CityWeather