const ccxt = require('ccxt');

exports.handler = async (event, context) => {

  const binance = new ccxt.binance();

  const ticker = await binance.fetchTicker('BTC/USDT');
  const {ask} = ticker;

  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ask}),
  }
}
