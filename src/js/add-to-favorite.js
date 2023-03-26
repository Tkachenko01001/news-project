const galleryNews = document.querySelector('.galleryNews');

const LOCALSTORAGE_KEY = 'favorite';
if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
  localStorage.setItem(LOCALSTORAGE_KEY, '[]');
}
let favoriteNews = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

// const favId = favoriteNews.map(fav => fav.id);
// console.log(favoriteNews.map(fav => fav.id));
// favId.forEach(id => (galleryNews.children.id === id))


export default function addToFavorite(e) {
  if (e.target.nodeName !== 'svg') {
    return;
  } 
  
  const favCard = e.target.parentNode.parentNode.parentNode;
  e.target.classList.toggle("favorite");
  
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
    url: favCard.lastElementChild.firstElementChild.textContent,
  };
  // console.log(favoriteCard, favCard);
  if (e.target.classList.contains("favorite")) {
    e.target.previousElementSibling.textContent = 'Remove from favorite';
    favoriteNews.push(favoriteCard);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favoriteNews));
  } else {
  e.target.previousElementSibling.textContent = 'Add to favorite';
  const indexCard = favoriteNews.findIndex(
    card => card.id === e.target.parentNode.parentNode.parentNode.id
  );
  favoriteNews.splice(indexCard, 1);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favoriteNews));
  }

  if (!favoriteNews.find(card => card.id === favoriteCard.id)) {
    favoriteNews.push(favoriteCard);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favoriteNews));
  }

  return favoriteNews;
}

galleryNews.addEventListener('click', addToFavorite);

//   const markup = `
// <div class="card" id="${ID}">
// <div class="card__img-wrapper">
//    <img class="card__img" src="${mediaUrl}" alt="${mediaAlt}">
//    <span class="card__category">${newsCategory}</span>
//    <button class="card__favorite" type="button" >
//        <span class="card__favText">${cardFavText}</span>
//        <svg class="card__favicon "width="16px" height="16px">
//            <use href='./images/symbol-defs.svg#icon-favorite'></use>
//        </svg>

//    </button>
// </div>

// <h2 class="card__title">${title}</h2>
// <p class="card__subscribe">${subscribe}</p>
// <span class="card__date">${date}</span>
// <a href="${url}">
//    <span class="card__read-more">Read more</span>
// </a>
// </div>
// `;
//     galleryNews.insertAdjacentHTML('beforeend', markup);
//   }
