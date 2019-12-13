
const btcFormat = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  maximumFractionDigits: 8,
}).format;

export function historyPushState({btc, fiat}) {
  btc = btcFormat(btc);

  const title = `₿${btc} & $${fiat}`;

  let url = `?btc=${btc}&fiat=${fiat}`;
  if (window.location.hash) {
    url += window.location.hash;
  }

  window.history.pushState({btc, fiat}, title, url);
}

export function readQueryParams(search) {
  search = search ? search : window.location.search;
  let btc = search.match(/btc=(\d*[.]?\d*)/);
  btc = btc && btc[1] ? btc[1] : 0;
  btc = Number.parseFloat(btc);

  let fiat = location.search.match(/fiat=(\d*[.]?\d*)/);
  fiat = fiat && fiat[1] ? fiat[1] : 0;
  fiat = Number.parseFloat(fiat);

  return {btc, fiat};
}
