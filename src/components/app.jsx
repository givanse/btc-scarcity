/** @jsx h */
import { h, Component } from 'preact';
import { IntlProvider } from 'preact-i18n';
import enUs from '../i18n/en-us.json';
import esMx from '../i18n/es-mx.json';
import { setLang } from '../utils/words';
import { fetchPrices } from '../utils/fetch-prices';
import {
  deconstructWindowLocation,
  internalNavigate,
  listenForDataNavigateClicks,
  scheduleHistoryPushState,
} from '../utils/router';

// Code-splitting is automated for routes
import Home from '../routes/home/index.jsx';

export default class App extends Component {

  state = {
    btcHodl: 0,
    btcPrice: 0,
    fiatPurchase: 0,
    loc: 'es',
    priceError: false,
  };

  pricePollTimer = null;

  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      window.onpopstate = (event) => {
        if (!event.state) {
          return;
        }

        const {btc, fiat, loc} = event.state; 
        this.setState({
          btcHodl: btc,
          fiatPurchase: fiat,
          loc,
        });
      }
    }

    listenForDataNavigateClicks(locationState => {
      locationState.loc = locationState.loc ? locationState.loc : this.state.loc;
      this.setStateFromLocation(locationState);
      internalNavigate(locationState);
    });
  }

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
  };
  
  updateLocale(loc) {
    setLang(loc);

    this.setState(function(state) {
      const newState = Object.assign({}, state);
      newState.loc = loc;
      
      scheduleHistoryPushState({
        btc: newState.btcHodl,
        fiat: newState.fiatPurchase,
        loc: newState.loc,
      });

      return newState;
    });
  }

  updateBtcHodl(btcAmount) {
    this.setState((state, props) => {
      const newState = Object.assign({}, state);
      newState.btcHodl = btcAmount;

      scheduleHistoryPushState({
        btc: newState.btcHodl,
        fiat: newState.fiatPurchase,
        loc: newState.loc,
      });

      return newState;
    });
  }


  updateFiatPurchase(fiatAmount) {
    this.setState((state, props) => {
      const newState = Object.assign({}, state);
      newState.fiatPurchase = fiatAmount;

      scheduleHistoryPushState({
        btc: newState.btcHodl,
        fiat: newState.fiatPurchase,
        loc: newState.loc,
      });

      return newState;
    });
  }

  updatePrices(btcPrice) {
    this.setState(function(state, props) {
      const newState = Object.assign({}, state);
      newState.btcPrice = btcPrice;
      newState.priceError = false;
      return newState;
    });
  }

  setStateFromLocation({btc, fiat, loc}) {
    this.setState({btcHodl: btc, fiatPurchase: fiat, loc});
  }

  fetchPrices() {
    fetchPrices()
    .then(({btcPrice}) => {
      if (!btcPrice || Number.isNaN(btcPrice)) {
        throw new Error('invalid btcPrice');
      }
      this.updatePrices(btcPrice);
    })
    .catch((error) => {
      console.error(error);
      this.setState({ priceError: true });
    });
  }

  startPricePolling() {
    this.fetchPrices();

    const oneMinute = 1000 * 60;
    const minutes = oneMinute * 30;
    this.pricePollTimer = setInterval(() => {
      this.fetchPrices();
    }, minutes);
  }

  componentDidMount() {
    this.startPricePolling();

    const locationState = deconstructWindowLocation(); 
    this.setStateFromLocation(locationState);
  }

  componentWillUnmount() {
    if (this.pricePollTimer) {
      clearInterval(this.pricePollTimer);
      this.pricePollTimer = null;
    }
  }

	render() {
    const {btcHodl, btcPrice, fiatPurchase, loc, priceError} = this.state;

    let locale = esMx;
    switch(loc) {
      case 'en':
        locale = enUs;
        break;
      case 'es':
        locale = esMx;
        break;
    }

		return (
      <IntlProvider definition={locale}>
        <div id="app">
          {priceError && (
            <p class="text-center text-red-600 text-sm py-2">
              Could not load BTC price. Values may be outdated.
            </p>
          )}
          <Home path="/" btcHodl={btcHodl} fiatPurchase={fiatPurchase}
                         btcPrice={btcPrice}
                         updateBtcHodl={this.updateBtcHodl.bind(this)}
                         updateFiatPurchase={this.updateFiatPurchase.bind(this)} >
            <button onClick={() => this.updateLocale('en')}>english</button>
            &nbsp;
            <button onClick={() => this.updateLocale('es')}>español</button>
          </Home>
        </div>
      </IntlProvider>
		);
	}
}
