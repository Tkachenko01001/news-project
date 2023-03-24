const galleryFavorite = document.querySelector('.favorite__list');

galleryFavorite.addEventListener('click', removeFromFavorite);

function removeFromFavorite(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  // console.log(e.target.parentNode);
  // console.log(galleryFavorite.children);
  e.target.parentNode.parentNode.parentNode.remove();
}
