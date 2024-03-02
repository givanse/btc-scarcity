function getAccessControlAllowOrigin(origin) {

  if (process.env.NODE_ENV === 'development') {
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

  const btcusd_url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
  let response = await fetch(btcusd_url); 
  response = await response.json();
  let btcPrice;
  if (response) {
    btcPrice = response.bitcoin ? response.bitcoin.usd : NaN;
  } else {
    console.log('coingecko bitcoin' + response);
  }

  const gold_url = 'https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd'
  response = await fetch(gold_url);
  response = await response.json();
  let goldPrice;
  if (response) {
    goldPrice = response['pax-gold']? response['pax-gold'].usd : NaN;
  } else {
    console.log('coingecko pax-gold' + response);
  }

  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': getAccessControlAllowOrigin(request.headers.origin),
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({btcPrice, goldPrice}),
  };
}
