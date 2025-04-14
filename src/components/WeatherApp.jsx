import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import ForecastCard from './ForecastCard';
import CityWeather from './CityWeather';

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