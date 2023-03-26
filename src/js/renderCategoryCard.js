const galleryNews = document.querySelector('.galleryNews');

const cardFavText = 'Add to favorite';
function renderCategoryCard(result) {
  const mediaUrl = result.multimedia[2].url;
  const mediaAlt = result.multimedia[2].caption;
  const newsCategory = result.section;
  const title = result.title;
  const subscribe = result.abstract;
 const date = Date.parse(result.published_date);
//   const date =
//     dateJS.getDate() +
//     '-' +
//    (dateJS.getMonth() + 1) +
//    '-' +
//    dateJS.getFullYear();
   const url = result.url;
   const ID = result.uri;

  const markup = `
<div class="card" id=${ID}>
<div class="card__img-wrapper">
<img class="card__img" src="${mediaUrl}" alt="${mediaAlt}"> 
<span class="card__category">${newsCategory}</span>
<div class="card__favorite">
<span class="card__favText">${cardFavText}</span>
<button class="card__favBtn" type="button" >
<svg class="card__favIcon" width="16" height="16" viewBox="0 0 32 32"> 
<path class="card__heart" stroke="#4440F7" style="stroke: var(--color3, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z"></path> 
</svg>
</button>
</div>
</div>
<h2 class="card__title">${title}</h2>
<p class="card__subscribe">${subscribe}</p>
<span class="card__date">${date}</span>
<a href="${url}">
<span class="card__read-more">Read more</span>
</a>
</div>
`;
  galleryNews.insertAdjacentHTML('beforeend', markup);
}
export default { renderCategoryCard };
export { cardFavText };
