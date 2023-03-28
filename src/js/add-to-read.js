const LOCALSTORAGE_KEY_READ = 'read';
const body = document.querySelector('body');
body.addEventListener('click', addToRead);

export default function addToRead(e) {
  if (!e.target.closest('.card__read-more')) {
    return;
  }

  if (!localStorage.getItem(LOCALSTORAGE_KEY_READ)) {
    localStorage.setItem(LOCALSTORAGE_KEY_READ, '[]');
  }

  let readNews = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_READ));

  const readCard = e.target.parentNode.parentNode;
  console.log(readCard);
  const readedCard = {
    id: readCard.id,
    cardFavText: 'Add to favorite',
    mediaUrl: readCard.firstElementChild.firstElementChild.src,
    mediaAlt: readCard.firstElementChild.firstElementChild.alt,
    newsCategory:
      readCard.firstElementChild.firstElementChild.nextElementSibling
        .textContent,
    title: readCard.firstElementChild.nextElementSibling.textContent,
    subscribe:
      readCard.lastElementChild.previousElementSibling.previousElementSibling
        .textContent,
    date: readCard.lastElementChild.previousElementSibling.textContent,
    url: readCard.lastElementChild.href,
  };

  if (!readNews.find(card => card.id === readedCard.id)) {
    readNews.push(readedCard);
    localStorage.setItem(LOCALSTORAGE_KEY_READ, JSON.stringify(readNews));
  }

  return readNews;
}


