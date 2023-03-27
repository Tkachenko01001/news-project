import RENDERCARD from './renderCard';
import axios from 'axios';

const appID = 'IIf4vmmTbfNyDLUoXuoPyrjTHkEJuSUj';

async function fetchNews(categ) {
    
    try {
        const response = await axios.get(`https://api.nytimes.com${categ}?api-key=${appID}`)
        response.data.results
          .map(element => {
            RENDERCARD.renderCard(element);
          })
          .join('');
        
    }
    catch (error) { 
        console.log(error)
    }
  }
}

export default { fetchNews };
