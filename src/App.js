import logo from './logo.svg';
import './App.css';
import WeatherApp from './components/WeatherApp';
import CityWeather from './components/CityWeather';
import { Routes, Route } from 'react-router-dom';
import WeatherDetails from './components/WeatherDetails';
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

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<WeatherApp />} />
        <Route path='/weather_details' element={<WeatherDetails />} />
      </Routes>
    </div>
  );
}

export default App;
