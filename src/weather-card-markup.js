import { getWeather } from './weather-api';

export const weatherInfo = document.querySelector('.weather-info');

export async function weatherCardMarkup(lat, lon) {
    try {
        const weatherData = await getWeather(lat, lon);
        const { location, temp, weather, weatherIcon, date, day } = weatherData;
        
        const weatherCard = `
            <div class="weather">
                <div class="weather__head">
                    <span class="weather__temperature">${temp}°</span>
                    <div class="weather__content">
                        <span class="weather__description">${weather}</span>
                        <div class="weather__location">
                            <svg viewBox="0 0 24 32" width="12" height="16">
                            <path fill="#fff" style="fill: var(--color1, #fff)" d="M12.16 0.88c-3.15 0.004-6.169 1.257-8.396 3.484s-3.48 5.247-3.484 8.396c-0.004 2.574 0.837 5.078 2.393 7.128 0 0 0.324 0.427 0.377 0.488l9.11 10.744 9.114-10.749c0.047-0.057 0.373-0.483 0.373-0.483l0.001-0.003c1.555-2.049 2.396-4.552 2.392-7.125-0.004-3.15-1.257-6.169-3.484-8.396s-5.247-3.48-8.396-3.484zM12.16 17.080c-0.854 0-1.69-0.253-2.4-0.728s-1.264-1.149-1.591-1.939-0.413-1.658-0.246-2.496c0.167-0.838 0.578-1.608 1.182-2.212s1.374-1.016 2.212-1.182c0.838-0.167 1.707-0.081 2.496 0.246s1.464 0.881 1.939 1.591c0.475 0.71 0.728 1.546 0.728 2.4-0.001 1.145-0.457 2.243-1.267 3.053s-1.908 1.265-3.053 1.267z"></path>
                            </svg>
                            <p class="weather__city">${location}</p>
                        </div>
                    </div>
                </div>
                <img class="weather__img" src="https://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="${weather}" />
                <p class="weather__date">
                ${day}</br>
                ${date}
                </p>
            </div>
        `;
        weatherInfo.insertAdjacentHTML('beforeend', weatherCard);
    } catch (error) {
        console.log(error);
    }
}