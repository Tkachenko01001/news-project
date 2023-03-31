import { NYTNewsAPI } from './fetchNews';
import { format } from 'date-fns';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../weather-card-markup';
import { NYTNewsAPI } from './fetchNews';
import galleryMarkup from './gallery-markup';

const galleryNews = document.querySelector('.galleryNews');


const buttonContainer = document.querySelector('.button-container');
const buttonsInModal = document.querySelector('#modalContent');
const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');
const btnFirstPg = document.querySelector('button.first-page');
const btnLastPg = document.querySelector('button.last-page');
const formSearch = document.querySelector('.search-form');
const searchBar = document.querySelector('.search-bar form');
const modal = document.getElementById('modal');
btnPrevPg.textContent = 'Prew';
btnNextPg.textContent = 'Next';

let allNews = [];
let valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 5,
};

if (window.innerWidth < 768) {
  valuePage.totalPages = 5;
} else {
  valuePage.totalPages = 3;
}

let perPage;
let pageNumber;

if (window.innerWidth < 768) {
  perPage = 4;
} else if ((window.innerWidth >= 768) & (window.innerWidth < 1280)) {
  perPage = 7;
} else {
  perPage = 8;
}

function pagination() {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;
  const range = delta + 4; 
  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item dot_style"><a class="pg-link">...</a></li>`;
  let countTruncate = 0; 
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;
  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';   
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {        
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {       
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {     
      render += renderPage(pos, active);
    }
  }
  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    pg.innerHTML = renderTwoSide;
  } else {
    pg.innerHTML = render;
  }
}

function renderPage(index, active = '') {
  return ` <li class="pg-item ${active}" data-page="${index}">
        <a class="pg-link" href="#">${index}</a>
    </li>`;
}

function handleButton(element) {
  if (element.classList.contains('first-page')) {
    valuePage.curPage = 1;
  } else if (element.classList.contains('last-page')) {
    valuePage.curPage = 10;
  } else if (element.classList.contains('prev-page')) {
    valuePage.curPage--;
    handleButtonLeft();
    btnNextPg.disabled = false;
    btnLastPg.disabled = false;
  } else if (element.classList.contains('next-page')) {
    valuePage.curPage++;
    handleButtonRight();
    btnPrevPg.disabled = false;
    btnFirstPg.disabled = false;
  }
  pagination();
}

function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    btnPrevPg.disabled = true;
    btnFirstPg.disabled = true;
  } else {
    btnPrevPg.disabled = false;
    btnFirstPg.disabled = false;
  }
}

function handleButtonRight() {
  if (valuePage.curPage === valuePage.totalPages) {    
    btnNextPg.disabled = true;
    btnLastPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
    btnLastPg.disabled = false;
  }
}

// Render page on Load
async function renderCard() {
  try {
    const data = await NYTNewsAPI.getPopularNews();
    const markup = galleryMarkup(
      data.results     
    );
    galleryNews.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    Notify.warning(error);
  }
}

function renderPageOnButtonClick(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  pageNumber = parseInt(e.target.dataset.page, 10);
  // pageNumber = e.target.dataset.page;
  valuePage.curPage = pageNumber;
  pagination(valuePage);
  handleButtonLeft();
  handleButtonRight();
  allNews = [...galleryNews.querySelectorAll('.card')];
  const newsPerPage = allNews.slice(
    perPage * (pageNumber - 1),
    perPage * pageNumber
  );
  allNews.map(item => (item.style.display = 'none'));
  newsPerPage.map(item => (item.style.display = 'block'));
  // console.log(galleryNews, allNews, newsPerPage);
}

// Пошук за пошуковим запитом:
function handleSubmit(e) {
  e.preventDefault();
  if (e.target.parentNode.clientWidth === 15) {
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
      ifEmptyQuery();
    }
  } catch (error) {
    Notify.warning(error);
  }
}

// Пошук за категорією:

async function renderSearchByCategoryCard(categ) {
  const data = await NYTNewsAPI.getNewsByCategories(categ);
  if (!data.results) {
    Notify.warning('error');
    return;
  } else {
    try {
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
      ifEmptyQuery();
    } catch (error) {
      Notify.warning(error);
    }
  }
}

function ifEmptyQuery() {
  const emptyQuerySection = document.querySelector('.js-empty-query');
  if (galleryNews.children.length === 0) {
    emptyQuerySection.classList.remove('empty-query');
  } else {
    emptyQuerySection.classList.add('empty-query');
  }
}

pagination();
renderCard();

formSearch.addEventListener('submit', handleSubmit);
searchBar.addEventListener('submit', handleSubmit);
pg.addEventListener('click', renderPageOnButtonClick);
buttonContainer.addEventListener('click', e => {
  if (e.target.closest('.button-ctg')) {
    galleryNews.innerHTML = '';
    renderSearchByCategoryCard(e.target.textContent.toLowerCase());
  }
});
buttonsInModal.addEventListener('click', e => {
  if (e.target.closest('.more-item-categories')) {
    modal.style.display = 'none';
    galleryNews.innerHTML = '';
    renderSearchByCategoryCard(encodeURI(e.target.textContent.toLowerCase()));
  }
});
document
  .querySelector('.page-container')
  .addEventListener('click', function (e) {
    handleButton(e.target);
  });
