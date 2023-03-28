import axios from 'axios';
import RENDERCARD from './renderCard';
import FETCHNEWSBYCATEGORY from './fetchNewsByCategory';
import '../weather-card-markup';
import { NYTNewsAPI } from './fetchNews';
import galleryMarkup from './gallery-markup';

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

// pg.addEventListener('click', e => {
//   const ele = e.target;

//   if (ele.dataset.page) {
//     const pageNumber = parseInt(e.target.dataset.page, 10);

//     valuePage.curPage = pageNumber;
//     pagination(valuePage);

//     handleButtonLeft();
//     handleButtonRight();
//   }
// });

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

// let startPage = 0;

// Render popular news on Load
async function renderCard(perPage, page) {
  try {
    const data = await NYTNewsAPI.getPopularNews();
    const markup = galleryMarkup(
      data.results.splice(perPage * (page - 1), perPage * page)
    );
    galleryNews.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error);
  }
}

let perPage;

if (window.innerWidth < 768) {
  perPage = 4;
} else if ((window.innerWidth >= 768) & (window.innerWidth < 1280)) {
  perPage = 7;
} else {
  perPage = 8;
}

pg.addEventListener('click', renderPageOnButtonClick);

function renderPageOnButtonClick(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const pageNumber = parseInt(e.target.dataset.page, 10);

  valuePage.curPage = pageNumber;

  pagination(valuePage);

  handleButtonLeft();
  handleButtonRight();

  galleryNews.innerHTML = '';

  renderCard(perPage, pageNumber);
}

renderCard(perPage, 1);
