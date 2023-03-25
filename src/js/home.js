import * as newsCard from './newsCard';
import FETCHNEWS from './fetchNews';
import addToFavorite from './add-to-favorite';

const galleryNews = document.querySelector('.galleryNews');
galleryNews.addEventListener('click', addToFavorite);
