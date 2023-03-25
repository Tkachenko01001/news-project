import * as newsCard from './js/newsCard';
import FETCHNEWS from './js/fetchNews';
import {
  divEl,
  iconSun,
  iconMoon,
  labelEl,
  themSwitch,
} from './js/theme-switcher';
import addToFavorite from './js/add-to-favorite';

const galleryNews = document.querySelector('.galleryNews');
galleryNews.addEventListener('click', addToFavorite);
