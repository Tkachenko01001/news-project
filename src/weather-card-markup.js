import { getWeather } from './weather-api';

const weatherInfo = document.querySelector('.weather-info');

export async function weatherCardMarkup({ lat = "40.7780171", lon = "74.2300493" }) {
    const weatherData = await getWeather(lat, lon);
    const { location, temp, weather, weatherIcon, date, day } = weatherData;
    
    let weatherCard = `
        <div class="weather">
            <div class="weather__head">
                <span class="weather__temperature">${temp}°</span>
                <div class="weather__content">
                    <span class="weather__description">${weather}</span>
                    <div class="weather__location">
                        <svg width="10" height="16">
                            <use href="./images/symbol-defs.svg#icon-location"></use>
                        </svg>
                        <p class="weather__city">${location}</p>
                    </div>
                </div>
            </div>
            <img class="weather__img" src="https://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="${weather}" />
            <p class="weather__day">
            <div class="weather__date">
                <p class="weather__day">
                ${day}</br>
                ${date}
                </p>
            </div>
            <div class="weather__button">
                <a class="weather__btn" href="">weather for week</a>
            </div>
        </div>
    `;
    
    return weatherCard;

    weatherInfo.insertAdjacentHTML('beforeend', weatherCard);
}