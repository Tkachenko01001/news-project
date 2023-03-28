import axios from 'axios';
import RENDERCARD from './renderCard';
import FETCHNEWSBYCATEGORY from './fetchNewsByCategory';
import { NYTNewsAPI } from './fetchNews';

const galleryNews = document.querySelector('.galleryNews');

// const pgContainer = document.querySelector('.pagination-container');
// const pg = document.getElementById('pagination');
// const btnNextPg = document.querySelector('.btn-list_next-page');
// const btnPrevPg = document.querySelector('.btn-list_prev-page');
// const btnFirstPg = document.querySelector('.btn-list_first-page');
// const btnLastPg = document.querySelector('.btn-list_last-page');

const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');
const btnFirstPg = document.querySelector('button.first-page');
const btnLastPg = document.querySelector('button.last-page');
const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 10,
};

pagination();

pg.addEventListener('click', e => {
  const ele = e.target;

  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);

    valuePage.curPage = pageNumber;
    pagination(valuePage);
    console.log(valuePage);
    handleButtonLeft();
    handleButtonRight();
  }
});

function pagination() {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

  const range = delta + 4; // use for handle visible number of links left side

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item dot_style"><a class="pg-link">...</a></li>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side

  // use for truncate two side
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;

  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';

    // truncate
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
        // truncate 2 side
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        // truncate left side or right side
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
      // not truncate
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

document
  .querySelector('.page-container')
  .addEventListener('click', function (e) {
    handleButton(e.target);
  });

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
    console.log(valuePage.curPage);
    btnNextPg.disabled = true;
    btnLastPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
    btnLastPg.disabled = false;
  }
}

btnPrevPg.textContent = 'Prew';
btnNextPg.textContent = 'Next';

let startPage = 0;

async function renderCard(perPage, page) {
  const data = await NYTNewsAPI.getPopularNews();   
  try {
    data.results
      .splice(perPage * (page - 1), perPage * page)
      .map(e => {
        const img = [e][0]?.media[0]?.['media-metadata']?.[2]?.url;
        const mediaUrl = img
          ? img
          : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
        const mediaAlt = [e][0]?.media[0]?.caption;
        const newsCategory = [e][0].section;
        const title = [e][0].title;
        const subscribe = [e][0].abstract;
        const date = [e][0].published_date;
        const url = [e][0].url;
        const ID = [e][0].id;
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
        galleryNews.insertAdjacentHTML('afterbegin', markup);
      })
      .join('');
  } catch (error) {   
    console.log(error);    
  }
}

pg.addEventListener('click', renderPageOnButtonClick);

function renderPageOnButtonClick(e) {
  console.log(e.target.nodeName);
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const page = e.target.dataset.page;
  const perPage = 8;
  renderCard(perPage, page);
}

renderCard(8, 1);