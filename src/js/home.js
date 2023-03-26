import './newsCard';
import  './fetchNews';
import addToFavorite from './add-to-favorite';

const galleryNews = document.querySelector('.galleryNews');

galleryNews.addEventListener('click', addToFavorite);
