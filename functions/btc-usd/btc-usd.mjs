const IS_DEV = process.env.NODE_ENV === 'development';

// Cache BTC price in the warm function instance so CoinGecko is not hit on every invoke.
const CACHE_TTL_MS = 60 * 1000;
let cachedPrice = null;
let cachedAt = 0;

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

function corsHeaders(origin) {
  const headers = {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': getAccessControlAllowOrigin(origin),
    /* Distinct CORS origins must not share one CDN entry */
    'Vary': 'Origin',
  };

  // Credentials + wildcard Origin is an invalid CORS combination; only set
  // credentials when we reflect a concrete allowlisted origin.
  if (!IS_DEV) {
    /* Required for cookies, authorization headers with HTTPS */
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return headers;
}

function cacheHeaders() {
  return {
    // Browser: short freshness; CDN: durable shared cache so scrapers rarely invoke the function.
    'Cache-Control': 'public, max-age=60',
    'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=60, stale-while-revalidate=300',
  };
}

async function getBTCUSD() {
  const now = Date.now();
  if (cachedPrice != null && (now - cachedAt) < CACHE_TTL_MS) {
    return cachedPrice;
  }

  const btcusd_url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
  const response = await fetch(btcusd_url);

  if (!response.ok) {
    console.error('coingecko bitcoin HTTP ' + response.status);
    return Number.isNaN(cachedPrice) || cachedPrice == null ? NaN : cachedPrice;
  }

  const body = await response.json();
  if (body) {
    const price = body.bitcoin ? body.bitcoin.usd : NaN;
    if (!Number.isNaN(price)) {
      cachedPrice = price;
      cachedAt = now;
    }
    return price;
  }

  console.error('coingecko bitcoin empty body');
  return NaN;
}

export default async (request) => {
  const origin = request.headers.get('origin');

  if (request.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers: {
        ...corsHeaders(origin),
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'access-control-allow-origin,Content-Type',
        'Access-Control-Max-Age': '1800',
        'Content-Type': 'application/json',
      },
    });
  }

  if (request.method !== 'GET') {
    return new Response('', { status: 404 });
  }

  let btcPrice;
  if (IS_DEV) {
    btcPrice = 69420;
  } else {
    btcPrice = await getBTCUSD();
  }

  /*
  // Gold price fetch kept for possible future re-enable:
  // const gold_url = 'https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd'
  // response = await fetch(gold_url);
  // response = await response.json();
  // let goldPrice;
  // if (response) {
  //   goldPrice = response['pax-gold']? response['pax-gold'].usd : NaN;
  // } else {
  //   console.log('coingecko pax-gold' + response);
  // }
  */

  if (Number.isNaN(btcPrice)) {
    return new Response(JSON.stringify({ error: 'btc price unavailable' }), {
      status: 502,
      headers: {
        ...corsHeaders(origin),
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ btcPrice }), {
    status: 200,
    headers: {
      ...corsHeaders(origin),
      ...cacheHeaders(),
      'Content-Type': 'application/json',
    },
  });
};

// Custom paths + per-IP rate limit (all Netlify plans). Humans poll every 10 min; scrapers get 429.
export const config = {
  path: ['/api/btc-usd', '/.netlify/functions/btc-usd/btc-usd'],
  rateLimit: {
    windowLimit: 20,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};
