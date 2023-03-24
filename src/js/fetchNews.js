import RENDERCARD from './renderCard';
import axios from 'axios';
const appID = 'IIf4vmmTbfNyDLUoXuoPyrjTHkEJuSUj';

async function fetchNews(categ) {
  fetch(`https://api.nytimes.com/svc/mostpopular/v2${categ}?api-key=${appID}`)
    
    try {
        const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2${categ}?api-key=${appID}`)
        RENDERCARD.renderCard(text.results[1]);
    }
    catch (error) { 
        alert(error)
    }
    //   .then(response => response.json())
    // .then(text => {
    //   RENDERCARD.renderCard(text.results[1]);
    // })
    //  ;
}
export default { fetchNews };
