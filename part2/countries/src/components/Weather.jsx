import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ country }) => {
    const [capitalWeather, setCapitalWeather] = useState()
    useEffect(() => {
        weatherService
            .getByName({ lat: country.capitalInfo.latlng[0], lon: country.capitalInfo.latlng[1] })
            .then(weather => {
                console.log(weather);
                setCapitalWeather(weather)
            })
    }, [])

    return <div>
        <h2>Weather in {country.capital[0]}</h2>
        {capitalWeather &&
            <div>
                <div>temperature {capitalWeather.current.temp} Celcius</div>
                <div><img src={`https://openweathermap.org/img/wn/${capitalWeather.current.weather.icon}.png`} /></div>
                <div>wind {capitalWeather.current.wind_speed} m/s</div>
            </div>
        }
    </div>
}

export default Weather