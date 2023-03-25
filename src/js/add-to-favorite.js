const galleryNews = document.querySelector('.galleryNews');

const LOCALSTORAGE_KEY = 'favorite';

export default function addToFavorite(e) {
  if (e.target.nodeName !== 'svg') {
    return;
  }
  if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
    localStorage.setItem(LOCALSTORAGE_KEY, '[]');
  }
  let favoriteNews = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  const favoriteCard = {
    id: e.target.parentNode.parentNode.parentNode.id,
    card: e.target.parentNode.parentNode.parentNode.innerHTML,
  };
  console.log(favoriteCard);
  favoriteNews.push(favoriteCard);
  console.log(favoriteNews);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favoriteNews));
  return favoriteNews;
}

galleryNews.addEventListener('click', addToFavorite);
