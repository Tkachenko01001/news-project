// const iconBlue =
//     '<svg class="card__favBtn" width="16" height="16" viewBox="0 0 32 32"> <path fill="#4b48da" style="fill: var(--color8, #4b48da)" d="M8.381 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path> </svg>';
//   const iconWhite =
//     '<svg class="card__favBtn" width="16" height="16" viewBox="0 0 32 32"> <path fill="none" stroke="#4440f7" style="stroke: var(--color3, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z"></path> </svg>';

//   const markup = `
// <div class="card">
//   <div class="card__img-wrapper"> 
//     <img class="card__img" src="${mediaUrl}" alt="${mediaAlt}"/> 
//     <span class="card__category">${newsCategory}</span>
//     <button class="card__favorite">
//       <span class="card__favText">${cardFavText}</span>
//       ${iconWhite} ${iconBlue}     
//     </button>
//   </div>
//   <h2 class="card__title">${title}</h2>
//   <p class="card__subscribe">${subscribe}</p>
//   <span class="card__date">${date}</span>
//   <a href="${url}">
//     <span class="card__read-more">Read more</span>
//   </a>
// </div>
// `;
const galleryFavorite = document.querySelector('.favorite__container');

galleryFavorite.addEventListener('click', removeFromFavorite);

function removeFromFavorite(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
    e.target.parentNode.parentNode.remove();
}
