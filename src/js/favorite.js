const galleryFavorite = document.querySelector('.favorite__container');

const LOCALSTORAGE_KEY = 'favorite';
let favoriteNews = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
console.log(favoriteNews);
function renderFavoriteList(cards) {
  const markup = cards
    .map(
      ({
        id,
        cardFavText,
        mediaUrl,
        mediaAlt,
        newsCategory,
        title,
        subscribe,
        date,
        url,
      }) => {
        return `
      <div class="card" id="${id}">
      <div class="card__img-wrapper">
      <img class="card__img" src="${mediaUrl}" alt="${mediaAlt}"> 
      <span class="card__category">${newsCategory}</span>
      <button class="card__favorite" type="button" >
      <span class="card__favText">${cardFavText}</span>
      
      <svg class="card__favicon "width="16px" height="16px">
      <use href='./images/symbol-defs.svg#icon-favorite'></use>
      </svg>
      
      </button>
      </div>
      <h2 class="card__title">${title}</h2>
      <p class="card__subscribe">${subscribe}</p>
      <span class="card__date">${date}</span>
      <a href="${url}">
      <span class="card__read-more">Read more</span>
      </a>
      </div>
      `;
      }
    )
    .join('');

  galleryFavorite.insertAdjacentHTML('afterbegin', markup);
}
renderFavoriteList(favoriteNews);

function removeFromFavorite(e) {
  if (e.target.nodeName !== 'svg') {
    return;
  }
  const unFavoriteCard = {
    id: e.target.parentNode.parentNode.parentNode.id,
    card: e.target.parentNode.parentNode.parentNode.innerHTML,
  };
  const indexCard = favoriteNews.findIndex(
    card => card.id === unFavoriteCard.id
  );
  favoriteNews.splice(indexCard, 1);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favoriteNews));
  e.target.parentNode.parentNode.parentNode.remove();
  return favoriteNews;
}

galleryFavorite.addEventListener('click', removeFromFavorite);
