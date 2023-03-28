import axios from 'axios';
const appID = 'IIf4vmmTbfNyDLUoXuoPyrjTHkEJuSUj';

// export async function fetchNews() {
//   try {
//     const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${appID}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export class NYTNewsAPI {
  static async getPopularNews() {
    const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${appID}`)
    console.log(response.data);
    return response.data
  }
 
  static async getNewsBySearchQuery(query, filter) {
    const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&fq=${filter}&api-key=${appID}`)
    console.log(response.data);
    return response.data
  }

  static async getNewsByCategories(categ) {
    const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/nyt/${categ}.json?api-key=${appID}`) 
    console.log(response.data);
    return response.data
  }
}


