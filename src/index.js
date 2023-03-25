import * as newsCard from './js/newsCard';
import FETCHNEWS from './js/fetchNews';
import addToFavorite from './js/add-to-favorite';
import { themeSwitch, iconSun, iconMoon, labelEl, bodyEl, pointerLight, pointerDark, borderEl} from "./js/theme-switcher";

const galleryNews = document.querySelector('.galleryNews');
galleryNews.addEventListener('click', addToFavorite);