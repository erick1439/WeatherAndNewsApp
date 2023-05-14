import { useState, useEffect } from 'react';
import { Navbar, FormControl, Button, Container} from 'react-bootstrap'
import "./Navegation.css"

const Navegation = ({searchedCity, handler}) => {

    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [temp, setTemp] = useState("");
    const [icon, setIcon] = useState("");

    const getWeather = async (city) => {

        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + process.env.REACT_APP_API_KEY_WEATHER);
        const result = await response.json();

        setTemp(Math.round(result.main.temp).toString());
        setIcon("https://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png");
    }

    const getCity = async () => {

        try {
            const response = await fetch('https://extreme-ip-lookup.com/json/?key=' + process.env.REACT_APP_API_KEY_IP);
            const result = await response.json();

            setCity(result.city);
            setRegion(result.region);

            getWeather(result.city);

        } catch(error) {
            alert("Location Service Error")
        }
    }

    useEffect(() => getCity, []);

    return(
        <Container fluid>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Weather Website</Navbar.Brand>
                <Navbar.Text className="item">
                    <p className="info">{city}, {region} {temp} &deg;F</p>
                    <img alt="weather icon" heigth="50px" width="40px" src={icon}/>
                </Navbar.Text>
                <div id="navbarSearch">
                    <FormControl
                        type="search"
                        placeholder="Search City"
                        className="mr-2"
                        aria-label="Search" 
                    />
                    <Button className="search" value={searchedCity} variant="outline-success" onClick={ (event) => {handler(event.target.previousSibling.value);}}>Search</Button>
                </div>
            </Navbar>
        </Container>
    );
}

export default Navegation;