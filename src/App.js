import logo from './logo.svg';
import './App.css';
import WeatherApp from './components/WeatherApp';
import CityWeather from './components/CityWeather';
import { Routes,Route } from 'react-router-dom';
import WeatherDetails from './components/WeatherDetails';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element = {<WeatherApp />} />
        <Route path='/weather_details' element = {<WeatherDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
