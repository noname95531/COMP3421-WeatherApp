import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
const WeatherDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { day } = location.state || {};
    logEvent(analytics, "page_" + location + "_weatherDetail");
    if (!day) {
        return (
            <div>
                <h2>No weather data available</h2>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }
    return (
        <div className='weather_details_div'>
            <h1>
                {new Date(day.forecastDate.slice(0, 4) + '-' +
                    day.forecastDate.slice(4, 6) + '-' +
                    day.forecastDate.slice(6, 8)).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric'
                    })}
            </h1>
            {/* <img 
                src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${day.ForecastIcon}.png`} 
                alt="Weather Icon"
                className="w-12 h-12 my-2 mx-auto"
            /> */}
            <div className='weather_info_div'>
                <p><strong>Weather:</strong> {day.forecastWeather}</p>
                <p><strong>Temp:</strong> {day.forecastMintemp.value} - {day.forecastMaxtemp.value} °C</p>
                <p><strong>Humidity:</strong> {day.forecastMinrh.value} - {day.forecastMaxrh.value} %</p>
                <p><strong>Wind:</strong> {day.forecastWind}</p>
                <p><strong>Rain Probability:</strong> {day.PSR}</p>
            </div>

            <button onClick={() => navigate('/')} className='return_button'>Return</button>
        </div>
    );
};

export default WeatherDetails;