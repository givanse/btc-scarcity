
export function buildSearch(btc, fiat) {
  let search = '';

  if (btc) {
    search += `btc=${btc}`;
  }

  if (fiat) {
    search += search ? '&' : '';
    search += `fiat=${fiat}`;
  }

  return search;
}

function historyPushState({btc, fiat}) {
  const search = buildSearch(btc, fiat);

  const title = `₿${btc} & $${fiat}`;

  let url = search ? `?${search}` : '';

  if (window.location.hash) {
    url += window.location.hash;
  }

  window.history.pushState({btc, fiat}, title, url);
}

let timer = null;

export function scheduleHistoryPushState({btc, fiat}) {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(function() {
    historyPushState({btc, fiat});
    timer = null;
  }, 100);
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
