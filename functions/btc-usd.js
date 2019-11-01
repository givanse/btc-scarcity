exports.handler = async (event, context) => {
  const ticker = {ask: 9002};

  return {
    statusCode: 200,
    // TODO: separate servers during dev, same on prod...
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(ticker),
  }
}
