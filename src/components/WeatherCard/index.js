import React, { useState, useEffect } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

import _ from 'lodash';
import './index.css'


const WeatherCard = () => {
    // API key for the external API
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY

    // Variable states
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [userPermitted, setUserPermitted] = useState(false)
    const [temperature, setTemperature] = useState(null)
    const [weatherIconURL, setWeatherIconURL] = useState(null)
    const [weatherDescription, setWeatherDescription] = useState(null)
    const [uvIndex, setUVIndex] = useState(null)
    const [uvColor, setUVColor] = useState('black')
    const [error, setError] = useState(null)


    // Get current location from the user
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                // Success callback function
                (position) => {
                    // Set the states accrodingly
                    setUserPermitted(true)
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                },
                // Error callback function
                (error) => {
                    // Handle errors, e.g. user denied location sharing permissions
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by this browser.");
        }
    }, [])


    // Fetch from the external API and update the states for city and state
    async function fetchGeoAPI() {
        try {
            let response = await fetch("http://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=1&appid=" + apiKey)
            const data = await response.json()
            setCity(data[0].name)
            setState(data[0].state)
        } catch (error) {
            setError(error.message)
        }
    }

    // Fetch from the external API and update the states for temperature, weather icon and weather description
    async function fetchWeatherAPI() {
        try {
            let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric")
            const data = await response.json()
            setTemperature(Math.ceil(data.main.temp))
            setWeatherIconURL("http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
            setWeatherDescription(_.capitalize(data.weather[0].description))
        } catch (error) {
            setError(error.message)
        }
    }

    // Fetch from the external API and update the states for UV index
    async function fetchUvAPI() {
        try {
            let response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,minutely,alerts&units=metric&appid=" + apiKey)
            const data = await response.json()
            setUVIndex(Math.ceil(data.current.uvi))
        } catch (error) {
            setError(error.message)
        }
    }

    // Make calls to the external API on inital mounting
    useEffect(() => {
        if (latitude != null && longitude != null) {
            fetchGeoAPI()
            fetchWeatherAPI()
            fetchUvAPI()
        }
    }, [latitude, longitude]);

    // Changes the text colour for the UV index based on the value 
    useEffect(() => {
        if (uvIndex < 2) {
            setUVColor('green')
        } else if (uvIndex < 5) {
            setUVColor('GoldenRod')
        } else if (uvIndex <= 7) {
            setUVColor('darkorange')
        } else {
            setUVColor('crimson')
        }
    }, [uvIndex])

    async function handleCitySearch(e) {
        e.preventDefault()
        try {
            let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
            const data = await response.json()

            if (data.cod == '404') {
                throw (data.message)
            } else {
                setCity(data.name)
                setState(data.state)
                setLatitude(data.coord.lat)
                setLongitude(data.coord.lon)
            }

            console.log(data)
        } catch (errorMessage) {
            setError(_.capitalize(errorMessage))

        }
    }

    useEffect(() => {
        if (error != null) {
            setTimeout(() => { setError(null) }, 4000)
        }
    }, [error])
    return (
        <div id='weatherCard' className="widgetCard">
            {/* Error message */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Weather header and user location */}
            <div className="row" style={{ textAlign: 'left' }}>
                <div className="col-sm-4 widgetHeader">Weather</div>
                {/* If the location data is not available, 
                render a search input for the user to provide the city to look up the weather for */}
                {city && state ?
                    <div className="col-sm-7" id="weatherLocation">{city}, {state}</div> :
                    <form className="col-sm-7" onSubmit={(e) => (handleCitySearch(e))}>
                        <Form.Control onChange={(e) => (setCity(e.target.value))} type="text" placeholder="Enter a city name" />
                        <Button style={{ margin: "5px auto", backgroundColor: "var(--secondary-color)" }} type="submit">Search</Button>
                    </form>}

            </div>

            {/* Weather details */}
            {weatherIconURL && temperature && weatherDescription &&

                <div div className='d-flex justify-content-around flex-wrap'>
                    <div className='col-xs-4'>
                        <img id="weatherIcon" src={weatherIconURL} alt="Weather icon" title="Weather icon" />
                    </div>
                    <div className='col-xs-4' style={{ fontSize: "3.5rem" }}>
                        <span style={{ color: "var(--secondary-color)" }}>{temperature}°C</span>
                    </div>
                    <div className='col-xs-4' style={{ padding: "1rem", fontSize: "1.3rem", textAlign: "left" }}>
                        <div >
                            UV: <strong style={{ color: uvColor }}> {uvIndex}</strong>
                        </div>
                        <div >
                            {weatherDescription}
                        </div>
                    </div>
                </div>}

        </div >
    );
};

export default WeatherCard;