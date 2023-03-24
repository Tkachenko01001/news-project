const galleryNews = document.querySelector('.galleryNews');
const cardFavText = "Add to favorite";
function renderCard(result) {
  const mediaUrl = result.media[0]['media-metadata'][2].url;
  const mediaAlt = result.media[0]['media-metadata'].caption;
  const newsCategory = result.section;
  const title = result.title;
  const subscribe = result.abstract;
  const date = result.published_date;
  const url = result.url;
  const ID = result.id;

  const markup = `
<div class="card">
<div class="card__img-wrapper">
<img class="card__img" src="${mediaUrl}" alt="${mediaAlt}"> 
<span class="card__category">${newsCategory}</span>
<div class="card__favorite">
<span class="card__favText">${cardFavText}</span>
<button class="card__favBtn" type="button" >
<svg class="card__favicon "width="16px" height="16px">
<use href='../images/symbol-defs.svg#icon-favorite'></use>
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
export default { renderCard };
