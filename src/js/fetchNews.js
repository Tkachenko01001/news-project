import RENDERCARD from './renderCard';
import axios from 'axios';
const appID = 'IIf4vmmTbfNyDLUoXuoPyrjTHkEJuSUj';

async function fetchNews(categ) {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/mostpopular/v2${categ}?api-key=${appID}`
    );

    /* if (response.data.num_results === 0) {
    } */

    response.data.results.map(element => {
      RENDERCARD.renderCard(element);
    });
  } catch (error) {
    alert(error);
  }
}
export default { fetchNews };
