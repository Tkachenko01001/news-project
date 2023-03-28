import axios from 'axios';

const appID = 'IIf4vmmTbfNyDLUoXuoPyrjTHkEJuSUj';

const category = '/svc/mostpopular/v2/viewed/7.json';

export default async function fetchNews() {
  try {
    const response = await axios.get(
      `https://api.nytimes.com${category}?api-key=${appID}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
