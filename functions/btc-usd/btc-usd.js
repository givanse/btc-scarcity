const ccxt = require('ccxt');

const accessControlAllowOrigin = process.env.NODE_ENV === 'development' ? '*' : 'https://btc.gratis';

exports.handler = async function(request, context) {

  if (request.httpMethod !== 'GET') {
    return {
      statusCode: 404,
      body: '',
    };
  }

  console.log(request);

  const binance = new ccxt.binance();
  const ticker = await binance.fetchTicker('BTC/USDT');
  const {ask} = ticker;

  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': accessControlAllowOrigin,
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ask}),
  }
}
