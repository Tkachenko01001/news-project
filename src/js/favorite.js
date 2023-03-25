const galleryFavorite = document.querySelector('.favorite__container');

const LOCALSTORAGE_KEY = 'favorite';
let favoriteNews = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

function renderFavoriteList(cards) {
  const markup = cards
    .map(({ id, card }) => {
      return `
      <div class="card" id="${id}">${card}</div>
      `;
    })
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
  const indexCard = favoriteNews.findIndex(card => card.id === unFavoriteCard.id);
  favoriteNews.splice(indexCard, 1); 
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favoriteNews));
  e.target.parentNode.parentNode.parentNode.remove();
  return favoriteNews;  
}

galleryFavorite.addEventListener('click', removeFromFavorite);
