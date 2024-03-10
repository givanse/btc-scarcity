
const IS_DEV = process.env.NODE_ENV === 'development';

function getAccessControlAllowOrigin(origin) {

  if (IS_DEV) {
    return '*';
  }

  if (!origin) {
    return 'https://btc.gratis';
  }

  origin = origin.replace(/https:\/\/(www\.)?/, '');
  switch(origin) {
    case 'btc.gratis':
      return 'https://btc.gratis';
    case 'btc.givan.se':
      return 'https://btc.givan.se';
    case 'bitcoin.givan.se':
      return 'https://bitcoin.givan.se';
  }

  return 'https://btc.gratis';
}

async function getBTCUSD() {
  const btcusd_url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
  let response = await fetch(btcusd_url); 
  console.log(`${response.status}: ${response.statusText}`);

  response = await response.json();
  if (response) {
    return response.bitcoin ? response.bitcoin.usd : NaN;
  } else {
    console.log('coingecko bitcoin' + response);
  }

  return NaN;
}

exports.handler = async function(request, context) {
  if (request.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': getAccessControlAllowOrigin(request.headers.origin),
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'access-control-allow-origin,Content-Type',
        'Access-Control-Max-Age': '1800',
        'Content-Type': 'application/json',
      },
      body: ''
    };
  }

  if (request.httpMethod !== 'GET') {
    return {
      statusCode: 404,
      body: '',
    };
  }

  let btcPrice;
  if (IS_DEV) {
    btcPrice = 69420;
  } else {
    btcPrice = await getBTCUSD();
  }

  /*
  const gold_url = 'https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd'
  response = await fetch(gold_url);
  response = await response.json();
  let goldPrice;
  if (response) {
    goldPrice = response['pax-gold']? response['pax-gold'].usd : NaN;
  } else {
    console.log('coingecko pax-gold' + response);
  }
  */

  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': getAccessControlAllowOrigin(request.headers.origin),
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({btcPrice, NaN}),
  };
}
