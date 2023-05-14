import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard.js';
import TopNews from '../TopNews/TopNews.js';
import "./Home.css"

const Home = ({searchedCity, countryCode, currentWeather, tomorrowsWeather}) => {
    return(
        <main>
            <br/>
            <div className="Container">
                <WeatherCard title="Current Weather" city={searchedCity} countryCode={countryCode} weatherInfo={currentWeather}/>
                <WeatherCard title="Tomorrow's Weather" city={searchedCity} countryCode={countryCode} weatherInfo={tomorrowsWeather}/>
            </div>          
            <TopNews/>
        </main>
    );
}

export default Home;