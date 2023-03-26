import FETCHNEWS from './fetchNews';
import FETCHNEWSBYCATEGORY from './fetchNewsByCategory';
import * as FAVOR from './favoriteIcon-switcher';
const galleryCategories = document.querySelector('.button-rend');
const category = '/svc/mostpopular/v2/viewed/7.json';

FETCHNEWS.fetchNews(category);

// Функція пошуку по категоріях готова!!!
//Розкоментувати коли буде блок.button - rend
// та кнопки категорій .button

// galleryCategories.addEventListener('click', e => {
//   console.log(e.target);
//   if (e.target.closest('.button')) {
//     galleryNews.innerHTML = '';
//     FETCHNEWSBYCATEGORY.fetchNews(e.target.textContent);
//   }
// });

// - тестовий запуск по категорії бізнес:
//FETCHNEWSBYCATEGORY.fetchNews('business');