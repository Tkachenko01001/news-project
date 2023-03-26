import * as RENDERCARD from './renderCard';
 const galleryNews = document.querySelector('.galleryNews');
galleryNews.addEventListener('click', (e) => {
    if (e.target.closest('.card__heart')) {
        e.target.classList.add('card__heart--fill');
        e.target.classList.remove('card__heart');
      e.target.parentElement.parentElement.previousElementSibling.textContent =
        'Remove from favorite';
        return
    };
    if (e.target.closest('.card__heart--fill')) {
        e.target.classList.remove('card__heart--fill');
        e.target.classList.add('card__heart');
        e.target.parentElement.parentElement.previousElementSibling.textContent =
          'Add to favorite';
    }
  }
);