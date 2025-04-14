import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForecastCard = ({ day }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        // Navigate to weather details page, and pass the day data
        navigate('/weather_details', { state: { day } }); 
    };
    
    return (
        <div className='forecast_card' onClick={handleClick}>
            <h3>
                {new Date(day.forecastDate.slice(0, 4) + '-' + 
                    day.forecastDate.slice(4, 6) + '-' + 
                    day.forecastDate.slice(6, 8)).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                })}
            </h3>


            <p><strong>Temp:</strong> {day.forecastMintemp.value} - {day.forecastMaxtemp.value} °C</p>

        </div>
    );
};

export default ForecastCard;