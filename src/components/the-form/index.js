import { h, Component } from 'preact';
import style from './style';
import f from './formatter';
import staticData from './static-data';
import BtcSign from '../btc-sign';
import LogBarChart from '../log-bar-chart';
import PerPerson from '../per-person';
import InputFiat from '../input-fiat';
import BitcoinStats from '../bitcoin-stats';
import TheHeader from '../the-header';
import BitcoinSection from '../bitcoin-section';
import {
  fiatToWords,
} from './words';
import { fetchBtcPrice } from './fetch-btc';
import {
  readQueryParams,
  historyPushState,
} from './router';
import toWords from './to-words';

const {
  UNITS,
  btcRemainTSupply,
  btcPerPerson,
  btcHodlInIndividualShares,
  goldAboveGround,
  goldPerPersonKg,
  broadMoneyPerCapita,
  moneySupply,
  usaMillionaireMedian,
  usaMillionaireMedianBroadPercentInBtc,
  netWorth1PercentMedian,
  netWorth1PercentMedianBroadMoneyPercentInBtc,
} = staticData;

const {
  TROY_OUNCE,
} = UNITS;

function scrollTo(query) {
  const el = document.querySelector(query);

  if (!el) {
    console.error(`could not find ${query}`);
    return;
  }

  const options = {
    top: el.getBoundingClientRect().y,
    behavior: 'smooth',
  };
  window.scrollTo(options);
}

export default class TheForm extends Component {

  state = {
    btcHodl: 0.00000001,
    btcPrice: 7000,
    fiatPurchase: 1,
  };

  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      window.onpopstate = (event) => {
        if (!event.state) {
          return;
        }

        console.log('pop', event);
        const {btc, fiat} = event.state; 
        this.setSearchState(btc, fiat);
      }
    }

    //this.initInternalNavigation();
  }

  initInternalNavigation() {
    document.addEventListener('click', event => {
      let target = event.target;

      do {

        if (target.tagName === 'A' && target.dataset.navigate !== undefined) {
          //event.preventDefault();

          const location = target.href;
          this.navigateHash(location);

          return;
        }

        target = target.parentElement;

      } while (target.tagName !== 'BODY');
    });
  }

  navigateHash(location) {
    const state = readQueryParams(location);
    const {btc, fiat} = state; 
    this.setSearchState(btc, fiat);
    historyPushState(state);
  }

  updateFiatPurchase(e) {
    const input = e.target;
    const value = input.value.replace(/[^0-9]/g,'');
    let fiatPurchase = Number.parseFloat(value);
    fiatPurchase = Number.isNaN(fiatPurchase) ? 0 : fiatPurchase;

    this._updateFiatPurchase(fiatPurchase);
  }

  _updateFiatPurchase(fiatAmount) {
    this.setState((state, props) => {
      const newState = Object.assign({}, state);
      newState.fiatPurchase = fiatAmount;

      historyPushState({btc: newState.btcHodl, fiat: newState.fiatPurchase});

      return newState;
    });
  }

  updateBtcHodl(e) {
    const input = e.target;
    const value = input.value.replace(/[^0-9]/g, '');
    let number = Number.parseFloat(value);
    number = Number.isNaN(number) ? 0 : number;
    this._updateBtcHodl(number);
  }

  _updateBtcHodl(btcAmount) {
    this.setState((state, props) => {
      const newState = Object.assign({}, state);
      newState.btcHodl = btcAmount;

      historyPushState({btc: newState.btcHodl, fiat: newState.fiatPurchase});

      return newState;
    });
  }

  fetchBtcPrice() {
    fetchBtcPrice().then(btcPrice => {
      console.log(btcPrice);
      this.updateBtcPrice(btcPrice);
    });
  }

  updateBtcPrice(btcPrice) {
    this.setState(function(state, props) {
      const newState = Object.assign({}, state);
      newState.btcPrice = btcPrice;
      return newState;
    });
  }

  setSearchState(btc, fiat) {
    this.setState(function(state, props) {
      const newState = Object.assign({}, state);
      newState.btcHodl = btc;
      newState.fiatPurchase = fiat;
      return newState;
    });
  }

  componentDidMount() {
    this.fetchBtcPrice();
    setInterval(() => {
      this.fetchBtcPrice();
    }, 1000 * 60);

    this.navigateHash();
    if (window.location.hash) {
      scrollTo(window.location.hash);
    }
  }

  render() {
    const { btcHodl, btcPrice, fiatPurchase } = this.state;
    const btcBought = fiatPurchase / btcPrice;

    return (
      <div>

      <TheHeader />

      <div id="world" class="block pt-4">
        <h2 class="bg-blue-600 text-white ">
          World Wide
        </h2>
      </div>

      <PerPerson />

      <div id="cash" class="block pt-4">
        <h2 class="background-money text-white">
          Cash
        </h2>
      </div>

      <InputFiat name="fiat-purchase"
                 fiatPurchase={fiatPurchase}
                 updateFiatPurchase={this.updateFiatPurchase.bind(this)}
                 updateValue={this._updateFiatPurchase.bind(this)} />

      <div class="text-center">
        <p class="text-sm text-gray-700">
          {fiatToWords(fiatPurchase)} could buy me 
        </p>
        {toWords.btc(btcBought)}

        <p class="text-sm text-gray-700 italic mb-4">
          {f.usd(fiatPurchase)} / <span class="bg-green-200 text-green-900 px-2 rounded">{f.usd(btcPrice)}</span> =
          &nbsp;<BtcSign /> {btcBought >= 1 ? f.btc(btcBought) : f.sat(btcBought)}
        </p>
      </div>

      <table class="w-6/12 text-center m-auto md:max-w-xl">
        <tr>
          <td class="text-xl">
            1 <i class="icon-person"></i>
          </td>
          <td class="text-xl">
            {f.dec(btcHodlInIndividualShares(btcBought))} <i class="icon-person"></i>
          </td>
        </tr>

        <tr>
          <td>
            <BtcSign /> {f.sat(btcPerPerson)}
          </td>
          <td>
            <BtcSign /> {btcBought >= 1 ? f.btc(btcBought) : f.sat(btcBought)}
          </td>
        </tr>
      </table>


      <div id="bitcoin" class="block pt-4">
        <h2 class="background-btc-orange text-black font-bold">
          Bitcoin
        </h2>
      </div>

      <BitcoinSection btcHodl={btcHodl} btcPrice={btcPrice}
                      onInputChange={this.updateBtcPrice.bind(this)}
                      onSliderChange={this._updateBtcHodl.bind(this)} />

      <div id="supply" class="block pt-4">
        <h2 class="bg-purple-700 text-white ">
          Supply
        </h2>
      </div>

      <InputFiat name="fiat-purchase-supply"
                 fiatPurchase={fiatPurchase}
                 updateFiatPurchase={this.updateFiatPurchase.bind(this)}
                 updateValue={this._updateFiatPurchase.bind(this)} />

      <h3>
        {'₿ ' + (btcBought >= 1 ? f.btc(btcBought) : f.sat(btcBought))}
        <br />
        supply percentage
      </h3>

      <LogBarChart fiatPurchase={fiatPurchase}
                   btcBought={btcBought} />

      <h3>Broad Money</h3>
      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <div>
          money
        </div>
        <div></div>
        <div>
          bitcoin
        </div>

        <div>
          {f.usd(moneySupply.broadMoney, 'billion')}<sup>*</sup>
        </div>
        <div>supply</div>
        <div>
          <BtcSign /> {f.btc(btcRemainTSupply)}
        </div>

        <div>
          {f.usd(broadMoneyPerCapita)}
        </div>
        <div>
          1<i class="icon-person"></i>
        </div>
        <div>
          <BtcSign /> {btcPerPerson.toFixed(8)}
        </div>
      </div>

      <h3>Mined Gold</h3>
      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <div>
          gold
        </div>
        <div></div>
        <div>
          bitcoin
        </div>

        <div>
          {f.dec(goldAboveGround * TROY_OUNCE, 'billion')} oz <sup>†</sup>
        </div>
        <div>supply</div>
        <div>
          <BtcSign /> {f.btc(btcRemainTSupply)}
        </div>

        <div>
          {(goldPerPersonKg * TROY_OUNCE).toFixed(3)} oz 
        </div>
        <div>
          1<i class="icon-person"></i>
        </div>
        <div>
          <BtcSign /> {btcPerPerson.toFixed(8)}
        </div>
      </div>

      <h3>Millionaire Median</h3>
      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <div>
          money
        </div>
        <div></div>
        <div>
          bitcoin
        </div>

        <div>
          {f.usd(moneySupply.broadMoney, 'billion')}
        </div>
        <div>supply</div>
        <div>
          <BtcSign /> {f.btc(btcRemainTSupply)}
        </div>

        <div>
          {f.usd(usaMillionaireMedian)}<sup>‡</sup>
        </div>
        <div>
          1<i class="icon-person"></i>
        </div>
        <div>
          <BtcSign /> {f.btc(usaMillionaireMedianBroadPercentInBtc)}
        </div>
      </div>  

      <h3>The 1% Median</h3>
      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <div>
          money
        </div>
        <div></div>
        <div>
          bitcoin
        </div>

        <div>
          {f.usd(moneySupply.broadMoney, 'billion')}
        </div>
        <div>supply</div>
        <div>
          <BtcSign /> {f.btc(btcRemainTSupply)}
        </div>

        <div>
          {f.usd(netWorth1PercentMedian)}<sup>†</sup>
        </div>
        <div>
          1<i class="icon-person"></i>
        </div>
        <div>
          <BtcSign /> {f.btc(netWorth1PercentMedianBroadMoneyPercentInBtc)}
        </div>
      </div>




      <h3 class="">
        Bitcoin
        <br />
        <i class="icon-chart-pie"></i>
      </h3>

      <BitcoinStats /> 

      <hr class="m-8" />

      <div class={style['footnotes']}>
        <p class={style['foot-note']}> 
          * Broad money is the total value of the world's money. This includes coins, banknotes, money market accounts, as well as saving, checking, and time deposits.
          <br />
          <a href="https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/">
            Desjardins, J. (2017, October 26). All of the World's Money and Markets in One Visualization. Retrieved October 30, 2019.
          </a>
        </p>
        <p class={style['foot-note']}>
          † The best estimates currently available suggest that around 190,040 tonnes of gold has been mined throughout history.
          <br />
          <a href="https://www.gold.org/about-gold/gold-supply/gold-mining/how-much-gold">
            How much gold has been mined? (2017, December 14). Retrieved October 30, 2019.
          </a>
        </p>
        <p class={style['foot-note']}>
          ‡ The Fed's most recent survey shows that the top 10% of Americans have a median and average net worth (assets minus liabilities) of $1.87 million and $4.03 million, respectively.
          <br />
          <a href="https://www.fool.com/investing/general/2016/01/24/how-does-your-net-worth-compare-to-the-average-ame.aspx">
            Campbell, T. (2018, March 7). How Does Your Net Worth Compare to the Average American Millionaire? Retrieved October 31, 2019.
          </a>
        </p>
        <p class={style['foot-note']}>
          § The median net worth for the top 1% is $10.7 million
          <br />
          <a href="https://www.financialsamurai.com/top-one-percent-net-worth-amounts-by-age/">
            Sammuray, F. The Top 1% Net Worth Amounts By Age. Retrieved October 31, 2019.
          </a>
        </p>
      </div>

      </div>
    );
  }

}
