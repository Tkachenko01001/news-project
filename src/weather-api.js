import axios from 'axios';
import { format, parse } from 'date-fns';
import {weatherCardMarkup} from './weather-card-markup';

export async function getWeather(lat, lon) {
    const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';
    const API_KEY = 'db193b635ac782b3b1dc7e0069e34820';

    try {
        const data = await axios.get(`${ENDPOINT}lat=${lat}&lon=${lon}&appid=${API_KEY}`);

        let result = {
            location: data.data.name,
            temp: Math.round(data.data.main.temp-273.15),
            weather: data.data.weather[0].main,
            weatherIcon: data.data.weather[0].icon,
            date: format(Date.now(), 'dd MMM yyyy'),
            day: format(Date.now(), 'iii'),
        }

        return result;

    } catch (error) {
        console.log(error);
    }
}


const geolocationDetermination = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                getWeather(lat, lon);
                weatherCardMarkup(lat, lon);
            },
            (error) => {
                console.error(error);
                const newYorkLat = 40.7128;
                const newYorkLon = -74.0060;
                getWeather(newYorkLat, newYorkLon);
                weatherCardMarkup(newYorkLat, newYorkLon);
            }
        );
    } 
}
geolocationDetermination();