
import React, { useEffect, useState } from "react";
//https://www.weatherapi.com/my/
const API_KEY = "537260dc2a50df9374abec6f58f72b0e";
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import dayjs from "dayjs";
import "../../assets/styles/annexes/Weather.css"
import LightModeIcon from '@mui/icons-material/LightMode';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AirIcon from '@mui/icons-material/Air';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Paper } from "@mui/material";
import Loader from "../../components/common/Loader";
const Weather = () => {
    const [weatherData, setWeatherData] = useState('');

    // const fetchWeatherData = () => {
    //     axios.get(
    //         `http://api.weatherapi.com/v1/forecast.json?key=bc7832f417be4d57b50133714242402&q=Seclin&days=1&aqi=no&alerts=no`
    //     )
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             console.log(Math.round(data.current.temp_c));
    //             setWeatherData(data);
    //         });
    // };

    const fetchWeatherData = async () => {
        await axios.get('http://api.weatherapi.com/v1/forecast.json?key=bc7832f417be4d57b50133714242402&q=Seclin&days=3&aqi=no&alerts=no')
            .then(res => setWeatherData(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchWeatherData();
    }, [])

    const dateDay = dayjs(new Date()).format("YYYY-MM-DD");

    return (
        <>
            {!weatherData ?
                <Loader />
                :
                <Box className="container">
                    <header>
                        <h1><CalendarMonthIcon />Maintenant</h1>
                        {/* <h1><CalendarMonthIcon />Heure : {weatherData.location.localtime} / Aujourd'hui</h1> */}
                        <h1><LocationOnIcon />{weatherData.location.name}</h1>
                    </header>
                    <div className="main__weather">
                        <div>
                            <img src={weatherData.current.condition.icon} />
                            <p className="main__temp">{weatherData.current.temp_c}°C</p>
                        </div>
                        <p>Ressenti : {weatherData.current.feelslike_c}°C</p>
                    </div>
                    {weatherData.forecast.forecastday
                        .filter((cast) => dayjs(cast.date).format("YYYY-MM-DD") === dayjs(new Date()).format("YYYY-MM-DD"))
                        .map((cast, index) =>
                            <div key={index}>
                                <div className="weather__sun">
                                    <p><LightModeIcon />{cast.astro.sunrise}</p>
                                    <p><WbTwilightIcon />{cast.astro.sunset}</p>
                                </div>
                                {/* <p><ThermostatIcon />max temp : {cast.day.maxtemp_c}°</p> */}
                                <div className="weather_hour">
                                    {cast.hour
                                        .filter((heure) => heure.time === dateDay + " 07:00" || heure.time === dateDay + " 08:00" || heure.time === dateDay + " 09:00" || heure.time === dateDay + " 12:00" || heure.time === dateDay + " 15:00" || heure.time === dateDay + " 17:00")
                                        .map((heure, index) => (
                                            <div key={index}>
                                                <div>
                                                    <p><AccessTimeIcon />{heure.time.substr(10)}</p>
                                                    <img src={heure.condition.icon} />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    <div className="weather__otherDays">
                        {weatherData.forecast.forecastday
                            .filter((cast) => dayjs(cast.date).format("YYYY-MM-DD") !== dayjs(new Date()).format("YYYY-MM-DD"))
                            .map((cast, index) =>
                                <div key={index}>
                                    <h1><CalendarMonthIcon />Jour : {dayjs(cast.date).format("DD-MM")}</h1>
                                    <p><ThermostatIcon />{cast.day.avgtemp_c}°</p>
                                    <img src={cast.day.condition.icon} />
                                </div>
                            )}
                    </div>
                </Box>
            }
        </>
    );
}




export default Weather