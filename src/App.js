import { useState, useEffect } from 'react';
import { getCode } from 'country-list';
import Home from './components/Home/Home.js';
import Footer from './components/Footer/Footer.js';
import Navbar from './components/Navegation/Navegation.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {

  const [searchedCity, setSearchedCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [currentWeather, setCurrentWeather] = useState({
      time: "",
      temp: "",
      feelsLike: "",
      weather_description: "",
      icon: "",
      temp_min: "",
      temp_max: "",
      humidity: "",
      wind_speed: "",
  });
    
  const [tomorrowsWeather, setTomorrowsWeather] = useState({
      time: "",
      temp: "",
      feelsLike: "",
      weather_description: "",
      icon: "",
      temp_min: "",
      temp_max: "",
      humidity: "",
      wind_speed: ""
  });

  const handler = async (value) => {
    if (value !== "") {
      let city = "";
      let country = "";
      let countryCode = "";

      value = value.charAt(0).toUpperCase() + value.slice(1);

      if (value.includes(", ")) {
        [city, country] = value.split(", ");

      } else {
        city = value;
      }

      country = country.toLowerCase();

      if (country === "united states" || country === "united states of america")
        countryCode = "US";

      else if (country.length === 2)
        countryCode = country;

      else 
        countryCode = getCode(country);

      if (countryCode === undefined)
        countryCode = "";

      getWeather(city, countryCode);
      getTomorrowsWeather(city, countryCode);
    } 
  }

  const getTomorrowsWeather = async (city, countryCode) => {

    try {
      const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + ", " + countryCode + "&cnt=2&units=imperial&appid=" + process.env.REACT_APP_API_KEY_WEATHER);
      const result = await response.json();


      const tomorrow = new Date(currentWeather.time);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let tomorrowsWeatherResponse = {
        time: tomorrow.toString(),
        temp: result.list[1].main.temp.toString(),
        feelsLike: result.list[1].main.feels_like.toString(),
        weather_description: result.list[1].weather[0].description,
        icon: "https://openweathermap.org/img/wn/" + result.list[1].weather[0].icon + "@2x.png",
        temp_min: result.list[1].main.temp_min.toString(),
        temp_max: result.list[1].main.temp_max.toString(),
        humidity: result.list[1].main.humidity.toString(),
        wind_speed: result.list[1].wind.speed.toString()
      }

      setTomorrowsWeather(tomorrowsWeatherResponse)

    } catch (error) {
      alert("Unable to fetch tomorrow's weather");
    }
  }

  const getWeather = async (city, countryCode) => {

    try {
      const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ", " + countryCode +"&units=imperial&appid=" + process.env.REACT_APP_API_KEY_WEATHER);
      const result = await response.json();

      let date = new Date();
      let localTime = date.getTime();
      let localOffset = date.getTimezoneOffset() * 60000;
      let utc = localTime + localOffset;
      let cityTime = utc + (1000 * result.timezone);
      let newTime = new Date(cityTime);

      let currentWeatherReponse = {
        time: newTime.toString(),
        temp: result.main.temp.toString(),
        feelsLike: result.main.feels_like.toString(),
        weather_description: result.weather[0].description,
        icon: "https://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png",
        temp_min: result.main.temp_min.toString(),
        temp_max: result.main.temp_max.toString(),
        humidity: result.main.humidity.toString(),
        wind_speed: result.wind.speed.toString()
      }

      setSearchedCity(city);
      setCurrentWeather(currentWeatherReponse);
      getTomorrowsWeather(city);

    } catch (error) {
      alert("Pease inser valid location")
    }
  }

  const getDefaultLocation = async () => {

    try {
      const response = await fetch('https://extreme-ip-lookup.com/json/?key=' + process.env.REACT_APP_API_KEY_IP);
      const result = await response.json();


      setSearchedCity(result.city.charAt(0).toUpperCase() + result.city.slice(1));
      setCountryCode(result.countryCode);
      getWeather(result.city.charAt(0).toUpperCase() + result.city.slice(1), result.countryCode);

    } catch (error) {
      alert("Location Service Error")
    }
  }

  useEffect(() => 
    getDefaultLocation

  , []);

  return (
    <div>
      <Navbar searchedCity={searchedCity} handler={handler}/>
      <Home searchedCity={searchedCity} countryCode={countryCode} currentWeather={currentWeather} tomorrowsWeather={tomorrowsWeather}/>
      <Footer/>
    </div>
  );
}

export default App;
