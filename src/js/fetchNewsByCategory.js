import RENDERCATEGORYCARD from './renderCategoryCard';

import axios from 'axios';

const appID = 'IIf4vmmTbfNyDLUoXuoPyrjTHkEJuSUj';
const ENDPOINT = 'https://api.nytimes.com/svc/news/v3/content/nyt/';
//const category = 'business';

async function fetchNews(categ) {
  try {
    const response = await axios.get(
      `${ENDPOINT}${categ}.json?api-key=${appID}`
    );
    response.data.results
      .map(element => {
        RENDERCATEGORYCARD.renderCategoryCard(element);
      })
      .join('');
  } catch {
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
