import axios from 'axios';
import { format, parse } from 'date-fns';

const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?lat=';
const API_KEY = 'db193b635ac782b3b1dc7e0069e34820';

export async function getWeather(lat, lon) {

    try {
        const data = await axios.get(`${ENDPOINT}${lat}&lon=${lon}&appid=${API_KEY}`);
      
        const result = {
            location: data.data.name,
            temp: Math.round(data.data.main.temp-273.15),
            weather: data.data.weather[0].main,
            weatherIcon: data.data.weather[0].icon,
            date: format(Date.now(), 'dd MMM yyyy'),
            day: format(Date.now(), 'iii'),
        }

        return result
    
        } catch (error) {
    }
}