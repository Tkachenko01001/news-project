import * as newsCard from './js/newsCard';
import FETCHNEWS from './js/fetchNews';
import {
  divEl,
  iconSun,
  iconMoon,
  labelEl,
  themSwitch,
} from './js/theme-switcher';

const galleryNews = document.querySelector('.galleryNews');

let favoriteNews;
const LOCALSTORAGE_KEY = 'favorite';

function addToFavorite(e) {
  if (e.target.nodeName !== 'svg') {
    return;
  }

  favoriteNews = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  // console.log(e.target.nodeName);
  // console.log(e.target.parentNode.parentNode.parentNode);
  const favoriteItem = e.target.parentNode.parentNode.parentNode.id;
  if (!favoriteNews.includes(favoriteItem)) {
    favoriteNews.push(favoriteItem);
  }
  console.log(favoriteNews);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favoriteNews));
  return favoriteNews;
}
console.log(favoriteNews);

galleryNews.addEventListener('click', addToFavorite);
