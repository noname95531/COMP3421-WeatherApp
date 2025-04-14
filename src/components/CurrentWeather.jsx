import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const currentResponse = await axios.get(
                    'https://data.weather.gov.hk/weatherAPI/opendata/weather.php',
                    {
                        params: {
                            dataType: 'rhrread',
                            lang: 'en'
                        }
                    }
                );
                setCurrentWeather(currentResponse.data);
            } catch (err) {
                setError('Failed to fetch current weather data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading current weather...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!currentWeather) {
        return null;
    }

    return (
        <div>
            <h2>Current Weather</h2>
            <div>
                <div>
                    {/* check weather the data exist and display it */}
                    <p><strong>Temperature:</strong> 
                        {currentWeather.temperature?.data?.find(d => d.place === 'Hong Kong Observatory')?.value || 'N/A'} °C
                    </p>
                    <p><strong>Humidity:</strong> 
                        {currentWeather.humidity?.data?.[0]?.value || 'N/A'} %
                    </p>
                    <p><strong>UV Index:</strong> 
                        {currentWeather.uvindex?.data?.[0]?.value || 'N/A'}
                    </p>
                </div>
                <div>
                    <p className="text-center">
                        Updated: {currentWeather.updateTime ? new Date(currentWeather.updateTime).toLocaleString() : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;