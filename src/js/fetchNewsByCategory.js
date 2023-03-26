import RENDERCATEGORYCARD from './renderCategoryCard';

import axios from 'axios';

const appID = 'IIf4vmmTbfNyDLUoXuoPyrjTHkEJuSUj';
const ENDPOINT = 'https://api.nytimes.com/svc/news/v3/content/nyt/';
//const category = 'business';

async function fetchNews(categ) {
  try {
    const response = await axios.get(`${ENDPOINT}${categ}.json?api-key=${appID}`);
      response.data.results
        .map(element => {
          RENDERCATEGORYCARD.renderCategoryCard(element);
        })
        .join('');
  } catch (error) {
    console.log(error);
  }
}

export default { fetchNews };
