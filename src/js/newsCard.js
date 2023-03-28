import FETCHNEWS from './fetchNews';
import FETCHNEWSBYCATEGORY from './fetchNewsByCategory';
import * as FAVOR from './favoriteIcon-switcher';
const galleryCategories = document.querySelector('.button-rend');
const category = '/svc/mostpopular/v2/viewed/7.json';

FETCHNEWS.fetchNews(category);
