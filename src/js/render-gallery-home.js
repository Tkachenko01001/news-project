import galleryMarkup from './gallery-markup';
import fetchNews from './api-service';

const galleryNews = document.querySelector('.galleryNews');

async function renderGallery() {
  try {
    const { results } = await fetchNews();
    const markup = galleryMarkup(results);
   
    galleryNews.insertAdjacentHTML('beforeend', markup);
    
    // galleryNews.innerHTML = markup;
  } catch (e) {
    console.log(e);
  }
}

renderGallery();
