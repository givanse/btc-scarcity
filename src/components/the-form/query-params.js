const f = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  maximumFractionDigits: 8,
});

export function updateQueryParams(state) {
  const btcHodl = f.format(state.btcHodl);
  const search = `?btc=${btcHodl}&fiat=${state.fiatPurchase}`;
  window.history.pushState({btc: state.btcHodl, fiat: state.fiatPurchase}, '', search);
}

export function readQueryParams(state) {
  let btc = window.location.search.match(/btc=(\d*[.]?\d*)/);
  btc = btc && btc[1] ? btc[1] : state.btcHodl;
  btc = Number.parseFloat(btc);

  let fiatPurchase = location.search.match(/fiat=(\d*[.]?\d*)/);
  fiatPurchase = fiatPurchase && fiatPurchase[1] ? fiatPurchase[1] : state.fiatPurchase;
  fiatPurchase = Number.parseFloat(fiatPurchase);

  return {btc, fiatPurchase};
}
