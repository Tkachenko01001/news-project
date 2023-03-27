import axios from 'axios';
// import './js/newsCard';
import './js/theme-switcher';
import './weather-card-markup';
import './js/currentDate';
import './js/add-to-read';
import './js/add-to-favorite';
import { NYTNewsAPI } from './js/fetchNews';


const galleryNews = document.querySelector('.galleryNews');


async function renderCard() {
    const data = await NYTNewsAPI.getPopularNews();
    
    try {
    console.log(data);
    const mediaUrl = data.results[0].media[0]['media-metadata'][2].url;
    const mediaAlt = data.results[0].media[0].caption;
    const newsCategory = data.results[0].section;
    const title = data.results[0].title;
    const subscribe = data.results[0].abstract;
    const date = data.results[0].published_date;
    const url = data.results[0].url;
    const ID = data.results[0].id;
    const cardFavText = 'Add to favorites';
    const markup = `
      <div class="card" id="${ID}">
        <div class="card__img-wrapper">
          <img class="card__img" src="${mediaUrl}" alt="${mediaAlt}">
          <span class="card__category">${newsCategory}</span>
          <div class="card__favorite">
            <span class="card__favText">${cardFavText}</span>
            <button class="card__favBtn" type="button" >
              <svg class="card__favIcon" width="16" height="16" viewBox="0 0 32 32">
                <path class="card__heart" stroke="#4440F7" style="stroke: var(--color3, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z"></path>
              </svg>
            </button>
          </div>
        </div>
        <h2 class="card__title">${title}</h2>
        <p class="card__subscribe">${subscribe}</p>
        <span class="card__date">${date}</span>
        <a href="${url}" target="_blank">
          <span class="card__read-more">Read more</span>
        </a>
      </div>
    `;
    galleryNews.insertAdjacentHTML('beforeend', markup);
    } catch (error) {
        console.log(error);
    }
  }
  
renderCard()


  galleryNews.addEventListener('click', (e) => {
    if (e.target.closest('.card__heart')) {
        e.target.classList.add('card__heart--fill');
        e.target.classList.remove('card__heart');
      e.target.parentElement.parentElement.previousElementSibling.textContent =
        'Remove from favorite';
        return
    };
    if (e.target.closest('.card__heart--fill')) {
        e.target.classList.remove('card__heart--fill');
        e.target.classList.add('card__heart');
        e.target.parentElement.parentElement.previousElementSibling.textContent =
          'Add to favorite';
    }
  }
);