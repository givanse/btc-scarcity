const host = process.env.NODE_ENV === 'development' ?
            'http://localhost:8888/.netlify/functions' :
            'https://btc.gratis/.netlify/functions';
const url = `${host}/btc-usd/btc-usd`;
// debug line
//const url = 'https://btc-scarcity.netlify.com/.netlify/functions/btc-usd/btc-usd';

export function fetchPrices() {
  const fetchOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      accept: 'application/json',
    }
  };

  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      // TODO: 502 although the response is correct
    }

    return response.json();
  });
}
