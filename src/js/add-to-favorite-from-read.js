const LOCALSTORAGE_KEY = 'favorite';
const galleryRead = document.querySelector('.read__container');
galleryRead.addEventListener('click', addToFavorite);

export default function addToFavorite(e) {
  if (e.target.nodeName !== 'path') {
    return;
  }

  e.target.classList.toggle('favorite');

  if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
    localStorage.setItem(LOCALSTORAGE_KEY, '[]');
  }

  let favoriteNews = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  const favCard =
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode;

  const favoriteCard = {
    id: favCard.id,
    cardFavText: 'Remove from favorite',
    mediaUrl: favCard.firstElementChild.firstElementChild.src,
    mediaAlt: favCard.firstElementChild.firstElementChild.alt,
    newsCategory:
      favCard.firstElementChild.firstElementChild.nextElementSibling
        .textContent,
    title: favCard.firstElementChild.nextElementSibling.textContent,
    subscribe:
      favCard.lastElementChild.previousElementSibling.previousElementSibling
        .textContent,
    date: favCard.lastElementChild.previousElementSibling.textContent,
    url: favCard.lastElementChild.href,
  };

  if (!favoriteNews.find(card => card.id === favoriteCard.id)) {
    favoriteNews.push(favoriteCard);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favoriteNews));
  }

  if (e.target.classList.contains('favorite')) {
    e.target.parentElement.parentElement.previousElementSibling.textContent =
      'Remove from favorite';
    e.target.classList.add('card__heart--fill');
    e.target.classList.remove('card__heart');   
  } else {
    e.target.parentElement.parentElement.previousElementSibling.textContent =
      'Add to favorite';
    e.target.classList.remove('card__heart--fill');
    e.target.classList.add('card__heart');
    const indexCard = favoriteNews.findIndex(
      card => card.id === favoriteCard.id
    );
    favoriteNews.splice(indexCard, 1);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favoriteNews));
  } 

  return favoriteNews;
}
