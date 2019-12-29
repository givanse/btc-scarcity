
export function buildSearchString(btc, fiat, loc) {
  let search = '';

  if (btc) {
    search += `btc=${btc}`;
  }

  if (fiat) {
    search += search ? '&' : '';
    search += `fiat=${fiat}`;
  }

  if (loc) {
    search += search ? '&' : '';
    search += `loc=${loc}`;
  }

  return search;
}

function historyPushState({btc, fiat, loc}, hash) {
  const search = buildSearchString(btc, fiat, loc);

  const title = `₿${btc} & $${fiat}`;

  let url = search ? `?${search}` : '';

  if (hash) {
    url += hash;
  }

  window.history.pushState({btc, fiat, loc}, title, url);
  scrollTo(hash);
}

let timer = null;

export function scheduleHistoryPushState(search, hash = window.location.hash) {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(function() {
    historyPushState(search, hash);
    timer = null;
  }, 100);
}

export function readQueryParams(search) {
  let btc = search.match(/btc=(\d*[.]?\d*)/);
  btc = btc && btc[1] ? Number.parseFloat(btc[1]) : 0;

  let fiat = search.match(/fiat=(\d*[.]?\d*)/);
  fiat = fiat && fiat[1] ? Number.parseFloat(fiat[1]) : 0;

  let loc = search.match(/loc=([a-z]{2})/);
  loc = loc && loc[1] ? loc[1] : null;

  return {btc, fiat, loc};
}

export function scrollTo(query) {
  if (!query) {
    return;
  }

  const el = document.querySelector(query);

  if (!el) {
    console.error(`could not find: ${query}`);
    return;
  }

  el.scrollIntoView({
    behavior: 'smooth',
  });
}

export function deconstructWindowLocation(location) {
  location = location ? location : window.location;

  const {btc, fiat, loc} = readQueryParams(location.search);
  const hash = location.hash;

  return {btc, fiat, loc, hash};
}

export function deconstructHref(href) {
  let {btc, fiat, loc} = readQueryParams(href);

  btc = btc ? btc : 0;
  fiat = fiat ? fiat : 0;

  const hashIndex = href.indexOf('#');
  let hash;
  if (hashIndex) {
    hash = href.substring(hashIndex);
  }

  return {btc, fiat, loc, hash};
}

export function listenForDataNavigateClicks(callback) {
  if (typeof window !== 'undefined') {
    window.document.addEventListener('click', event => {
      let target = event.target;

      do {

        if (target.tagName === 'A' && target.dataset.navigate !== undefined) {
          event.preventDefault();

          const href = target.href;
          const obj = deconstructHref(href);
          callback(obj);
          
          return false;
        }

        target = target.parentElement;

      } while (target.tagName !== 'BODY');
    });
  }
}
