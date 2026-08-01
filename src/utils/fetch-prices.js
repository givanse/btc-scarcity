// Same-origin in production avoids CORS and uses the rate-limited /api/btc-usd path.
const url = process.env.NODE_ENV === 'development' ?
            'http://localhost:8888/api/btc-usd' :
            '/api/btc-usd';
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
      throw new Error(`btc-usd request failed: ${response.status}`);
    }

    return response.json();
  });
}
