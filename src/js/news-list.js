import axios from 'axios';

/* api key: yoJNY4CDh8qs2NwmNaiayTrYgBGsSShL
    secret: BDFefAIQq5bNJAkY
    https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=yourkey
*/

// async fetchImages(query) {
//     const options = {
//       params: {
//         key: 'yoJNY4CDh8qs2NwmNaiayTrYgBGsSShL',
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//         per_page: this.per_page,
//         page: this.page,
//         q: this.query,
//       },
//     };

async function getNews(params) {
  const options = {
    params: {
      key: 'yoJNY4CDh8qs2NwmNaiayTrYgBGsSShL',
    },
  };

  try {
    const response = await axios.get(
      'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=yoJNY4CDh8qs2NwmNaiayTrYgBGsSShL'
    );

    console.log(response);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

getNews();
