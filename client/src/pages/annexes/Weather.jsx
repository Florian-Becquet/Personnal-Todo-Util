
import React, { useEffect, useState } from "react";
//https://www.weatherapi.com/my/
const API_KEY = "537260dc2a50df9374abec6f58f72b0e";
import axios from 'axios';
import dayjs from "dayjs";
import "../../assets/styles/annexes/Weather.css"
import LightModeIcon from '@mui/icons-material/LightMode';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TextField } from "@mui/material";
import Loader from "../../components/common/Loader";
import 'dayjs/locale/fr';
const Weather = () => {
    const [weatherData, setWeatherData] = useState('');
    const [city, setCity] = useState('Seclin');

    dayjs.locale('fr')

    const fetchWeatherData = async () => {
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=bc7832f417be4d57b50133714242402&q=${city}=&days=3&aqi=no&alerts=no`)
            .then(res => setWeatherData(res.data))
            .catch(err => console.log(err))
    }

    console.log(weatherData);


    useEffect(() => {
        fetchWeatherData();
    }, [city])

    const dateDay = dayjs(new Date()).format("YYYY-MM-DD");
    return (
        <>
            {!weatherData ?
                <Loader message='' />
                :
                <div className="container">
                    <div className="weather">

                        <div className="main__day">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setCity(e.target.value)
                                }}
                            >
                                <TextField label="Rechercher une ville" variant="outlined" onChange={(e) => setCity(e.target.value)} sx={{ mb: 3 }} />
                                {/* <Button variant="contained" type='submit' sx={{ mt: 3, width: "50%", mx: 'auto' }}>
                                    Ok
                                </Button> */}
                            </form>
                            <div>
                                <div>
                                    <h1><LocationOnIcon />{weatherData.location.name}, <span>{weatherData.location.country}</span></h1>
                                    
                                </div>

                                <p>Aujourd'hui, {dayjs(new Date()).format("DD MMMM YYYY")}</p>
                            </div>
                            <div className="main__weather">
                                <div>
                                    <img src={weatherData.current.condition.icon} />
                                    <p className="main__temp">{weatherData.current.temp_c}°C</p>
                                </div>
                                <p></p>
                            </div>
                            <hr />
                            <div className="weather__options">
                                <p>Ressenti : <span>{weatherData.current.feelslike_c}°C </span></p>
                                <p>Humidité : <span>{weatherData.current.humidity}%</span></p>
                                <p>Vent : <span>{weatherData.current.wind_kph} km/h</span></p>
                            </div>
                            <hr />
                            {weatherData.forecast.forecastday
                                .filter((cast) => dayjs(cast.date).format("YYYY-MM-DD") === dayjs(new Date()).format("YYYY-MM-DD"))
                                .map((cast, index) =>
                                    <div key={index}>
                                        <div className="weather__sun">
                                            <p><LightModeIcon />{cast.astro.sunrise}</p>
                                            <p><WbTwilightIcon />{cast.astro.sunset}</p>
                                        </div>
                                        <hr />
                                        <div className="weather__hour">
                                            {cast.hour
                                                .filter((heure) => heure.time === dateDay + " 07:00" || heure.time === dateDay + " 08:00" || heure.time === dateDay + " 09:00" || heure.time === dateDay + " 12:00" || heure.time === dateDay + " 15:00" || heure.time === dateDay + " 17:00")
                                                .map((heure, index) => (
                                                    <div key={index}>
                                                        <p><AccessTimeIcon />{heure.time.substr(10)}</p>
                                                        <img src={heure.condition.icon} />
                                                    </div>
                                                ))}
                                        </div>

                                    </div>
                                )}
                        </div>
                        <div className="weather__otherDays">
                            {weatherData.forecast.forecastday
                                .filter((cast) => dayjs(cast.date).format("YYYY-MM-DD") !== dayjs(new Date()).format("YYYY-MM-DD"))
                                .map((cast, index) =>
                                    <div key={index}>
                                        <h1><CalendarMonthIcon />{dayjs(cast.date).format("dddd DD")}</h1>
                                        <div>
                                            <img src={cast.day.condition.icon} />
                                            <p><ThermostatIcon />{cast.day.avgtemp_c}°</p>
                                        </div>
                                    </div>
                                )}
                        </div>

                        {/* <header>
                            <h1><CalendarMonthIcon />Maintenant</h1>
                        
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
                                   
                                    <div className="weather__hour">
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
                                        <h1><CalendarMonthIcon />{dayjs(cast.date).format("DD-MM")}</h1>
                                        <div>
                                            <p><ThermostatIcon />{cast.day.avgtemp_c}°</p>
                                            <img src={cast.day.condition.icon} />
                                        </div>
                                    </div>
                                )}
                        </div> */}
                    </div>
                </div>
            }
        </>
    );
}




export default Weather