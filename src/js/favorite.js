const galleryFavorite = document.querySelector('.favorite__container');

galleryFavorite.addEventListener('click', removeFromFavorite);

function removeFromFavorite(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
    e.target.parentNode.parentNode.remove();
}

// const LOCALSTORAGE_KEY = 'favorite';
// const favoriteID = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
// favoriteID.map(ID => `
// <div class="card" id="${ID}">
// <div class="card__img-wrapper">
// <img class="card__img" src="${mediaUrl}" alt="${mediaAlt}"> 
// <span class="card__category">${newsCategory}</span>
// <button class="card__favorite" type="button" >
// <span class="card__favText">${cardFavText}</span>

// <svg class="card__favicon "width="16px" height="16px">
// <use href='./images/symbol-defs.svg#icon-favorite'></use>
// </svg>

// </button>
// </div>
// <h2 class="card__title">${title}</h2>
// <p class="card__subscribe">${subscribe}</p>
// <span class="card__date">${date}</span>
// <a href="${url}">
// <span class="card__read-more">Read more</span>
// </a>
// </div>
// `)

// import FETCHNEWS from './fetchNews';

// const category = '/viewed/7.json';

// FETCHNEWS.fetchNews(category);

// console.log(favoriteID);
// galleryFavorite.innerHTML = favoriteMarkup;