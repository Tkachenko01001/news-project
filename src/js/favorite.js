const galleryFavorite = document.querySelector('.favorite__container');

const LOCALSTORAGE_KEY = 'favorite';
const favoriteCards = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
console.log(favoriteCards);

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
renderFavoriteList(favoriteCards);
