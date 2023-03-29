import './js/readPage';
// import axios from 'axios';
// import './js/newsCard';
import './js/theme-switcher';
import './js/categoriesBtn';
import './weather-card-markup';
import './js/current-date';
import './js/add-to-read';
import './js/add-to-favorite';
import './js/pagination';
import { NYTNewsAPI } from './js/fetchNews';
import { format } from 'date-fns';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const galleryNews = document.querySelector('.galleryNews');
const buttonContainer = document.querySelector('.button-container');
const buttonsInModal = document.querySelector('#modalContent');

// Відображення популярних новин:
async function renderCard() {
  try {
    const data = await NYTNewsAPI.getPopularNews();
    const finalResult = data.results
      .map(e => {
        const img = [e][0]?.media[0]?.['media-metadata']?.[2]?.url;
        const mediaUrl = img
          ? img
          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/390px-No-Image-Placeholder.svg.png';
        const mediaAlt = [e][0]?.media[0]?.caption;
        const newsCategory = [e][0].section;
        const title = [e][0].title;
        const subscribe = [e][0].abstract;
        const date = format(Date.parse([e][0].published_date), 'yyyy-MM-dd');
        const url = [e][0].url;
        const ID = [e][0].id;
        const cardFavText = 'Add to favorites';
        return ` <div class="card" id="${ID}">
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
      })
      .join('');
    galleryNews.insertAdjacentHTML('beforeend', finalResult);
  } catch (error) {
    Notify.warning(error);
  }
}

renderCard();

// Пошук за пошуковим запитом:
const formSearch = document.querySelector('.search-form');
const searchBar = document.querySelector('.search-bar form');
formSearch.addEventListener('submit', handleSubmit);
searchBar.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  if (e.target.style.display === 'none') {
    return;
  }
  galleryNews.innerHTML = '';
  renderSearchQueryCard(e.target.querySelector('input').value, '');
}

async function renderSearchQueryCard(query, filter) {
  try {
    const data = await NYTNewsAPI.getNewsBySearchQuery(query, filter);
    if (!data.response.docs) {
      Notify.warning('error');
      return;
    } else {
      const finalResult = data.response.docs
        .map(e => {
          const img = [e][0]?.multimedia?.[0]?.url;
          const mediaUrl = img
            ? `https://static01.nyt.com/${img}`
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/390px-No-Image-Placeholder.svg.png';
          const mediaAlt = [e][0]?.multimedia?.[0]?.crop_name;
          const newsCategory = [e][0].section_name;
          const title = [e][0].headline?.main;
          const subscribe = [e][0].abstract;
          const date = format(Date.parse([e][0].pub_date), 'yyyy-MM-dd');
          const url = [e][0].web_url;
          const ID = [e][0].uri;
          const cardFavText = 'Add to favorites';
          return `
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
        })
        .join('');
      galleryNews.insertAdjacentHTML('beforeend', finalResult);
    }
  } catch (error) {
    Notify.warning(error);
  }
}

// Пошук за категорією:

buttonContainer.addEventListener('click', e => {
  if (e.target.closest('.button-ctg')) {
    galleryNews.innerHTML = '';
    renderSearchByCategoryCard(e.target.textContent.toLowerCase());
  }
});
const modal = document.getElementById('modal');
buttonsInModal.addEventListener('click', e => {
  if (e.target.closest('.more-item-categories')) {
    modal.style.display = 'none';
    galleryNews.innerHTML = '';
    renderSearchByCategoryCard(encodeURI(e.target.textContent.toLowerCase()));
  }
});

async function renderSearchByCategoryCard(categ) {
  const data = await NYTNewsAPI.getNewsByCategories(categ);
  if (!data.results) {
    Notify.warning('error');
    return;
  } else {
    try {
      console.log(data);

      const finalResult = data.results
        .map(e => {
          const img = [e][0]?.multimedia?.[2]?.url;
          const mediaUrl = img
            ? img
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/390px-No-Image-Placeholder.svg.png';
          const mediaAlt = [e][0]?.multimedia?.[2]?.caption;
          const newsCategory = [e][0]?.section;
          const title = [e][0]?.title;
          const subscribe = [e][0]?.abstract;
          const date = format(Date.parse([e][0]?.published_date), 'yyyy-MM-dd');
          const url = [e][0].url;
          const ID = [e][0].uri;
          const cardFavText = 'Add to favorites';
          return `
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
        })
        .join('');
      galleryNews.insertAdjacentHTML('beforeend', finalResult);
    } catch (error) {
      Notify.warning(error);
    }
  }
}
//renderSearchByCategoryCard(encodeURI('crosswords & games'));

galleryNews.addEventListener('click', e => {
  if (e.target.closest('.card__heart')) {
    e.target.classList.add('card__heart--fill');
    e.target.classList.remove('card__heart');
    e.target.parentElement.parentElement.previousElementSibling.textContent =
      'Remove from favorite';
    return;
  }
  if (e.target.closest('.card__heart--fill')) {
    e.target.classList.remove('card__heart--fill');
    e.target.classList.add('card__heart');
    e.target.parentElement.parentElement.previousElementSibling.textContent =
      'Add to favorite';
  }
});
function ifEmptyQuery() {
  const emptyQuerySection = document.querySelector('.js-empty-query');
  if (galleryNews.children.length === 0) {
    emptyQuerySection.classList.remove('empty-query');
  } else {
    emptyQuerySection.classList.add('empty-query');
  }
}
