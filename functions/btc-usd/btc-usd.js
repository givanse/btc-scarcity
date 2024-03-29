const ccxt = require('ccxt');

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

  const binance = new ccxt.binance();
  const ticker = await binance.fetchTicker('BTC/USDT');
  const btcPrice = ticker.ask;

  //TODO: find ticker
  const goldPrice = 1518.1;// ticker.ask;

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
