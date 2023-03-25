import RENDERCARD from './renderCard';
import axios from 'axios';

const appID = 'IIf4vmmTbfNyDLUoXuoPyrjTHkEJuSUj';

async function fetchNews(categ) {
  fetch(`https://api.nytimes.com/svc/mostpopular/v2${categ}?api-key=${appID}`)
    
    try {
        const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2${categ}?api-key=${appID}`)
        response.data.results.map(element => {
          RENDERCARD.renderCard(element);  
        })
        
    }
    catch (error) { 
        alert(error)
    }
}
export default { fetchNews };
