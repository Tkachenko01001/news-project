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

  catch {
    (function (error) {
      console.log(error);
      console.log(error.response);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }
  
  }

export default { fetchNews };
