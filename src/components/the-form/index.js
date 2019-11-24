import { h, Component } from 'preact';
import style from './style';
import f from './formatter';
import staticData from './static-data';
import BtcSign from '../btc-sign';
import {
  fiatToWords,
  btcToWords,
} from './words';

const {
  UNITS,
  btcTCap,
  btcLostPerc,
  btcLost,
  btcRemainTSupply,
  worldPopulation,
  btcPerPerson,
  btcHodlInIndividualShares,
  goldAboveGround,
  goldPerPersonKg,
  broadMoneyPerCapita,
  moneySupply,
  usaMillionaireMedian,
  usaMillionaireMedianBroadPercent,
  usaMillionaireMedianBroadPercentInBtc,
  netWorth1PercentMedian,
  netWorth1PercentMedianBroadMoneyPercent,
  netWorth1PercentMedianBroadMoneyPercentInBtc,
} = staticData;

const {
  TROY_OUNCE,
} = UNITS;

export default class TheForm extends Component {

  state = {
    btcHodl: 0.00000000,
    btcPrice: 0,
    fiatPurchase: 0,
  };

  constructor(props) {
    super(props);

    window.onpopstate = (event) => {
      const {btc, fiatPurchase} = event.state; 
      this.setSearchState(btc, fiatPurchase);
    }
  }

  updateFiatPurchase(e) {
    const input = e.target;
    let fiatPurchase = Number.parseFloat(input.value);
    fiatPurchase = Number.isNaN(fiatPurchase) ? 0 : fiatPurchase;

    this.setState((state, props) => {
      const s = Object.assign({}, state);
      s.fiatPurchase = fiatPurchase;

      this.setQueryParams(s);

      return s;
    });
  }

  updateBtcHodl(e) {
    const input = e.target;
    let number = Number.parseFloat(input.value);
    number = Number.isNaN(number) ? 0 : number;

    this.setState((state, props) => {
      const s = Object.assign({}, state);
      s.btcHodl = number;

      this.setQueryParams(s);

      return s;
    });
  }

  fetchBtcPrice() {
    const host = process.env.NODE_ENV === 'development' ?
                'http://localhost:8888/.netlify/functions' :
                'https://btc-scarcity.netlify.com/.netlify/functions';
    const url = `${host}/btc-usd/btc-usd`;

    const fetchOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        accept: 'application/json',
      }
    };

    fetch(url, fetchOptions).then(response => {
      if (!response.ok) {
        return;
      }

      response.json().then(ticker => {
        this.updateBtcPrice(ticker.ask);
      });
    });
  }

  updateBtcPrice(btcPrice) {
    this.setState(function(state, props) {
      const s = Object.assign({}, state);
      s.btcPrice = btcPrice;
      return s;
    });
  }

  setQueryParams(state) {
    const search = `?btc=${state.btcHodl}&fiat=${state.fiatPurchase}`;
    window.history.pushState({btc: state.btcHodl, fiat: state.fiatPurchase}, '', search);
  }

  readQueryParams() {
    let btc = window.location.search.match(/btc=(\d*[.]?\d*)/);
    btc = btc && btc[1] ? btc[1] : 0;
    let fiatPurchase = location.search.match(/fiat=(\d*[.]?\d*)/);
    fiatPurchase = fiatPurchase && fiatPurchase[1] ? fiatPurchase[1] : 0;
    this.setSearchState(btc, fiatPurchase);
  }

  setSearchState(btc, fiat) {
    this.setState(function(state, props) {
      const s = Object.assign({}, state);
      s.btcHodl = btc;
      s.fiatPurchase = fiat;
      return s;
    });
  }

  componentDidMount() {
    this.fetchBtcPrice();
    this.readQueryParams();
  }

  render() {
    const { btcHodl, btcPrice, fiatPurchase } = this.state;
    const btcBought = fiatPurchase / btcPrice;
    //const btcHodlPercOfRemainTSupply = btcHodlPercOfRemainTSupply(btcHodl);

    return (
      <div>

      <h2>Bitcoin</h2>

      <form class="text-center"
            onSubmit={e => e.preventDefault()}>
        <label for="fiat-purchase">
          If I were to buy
        </label>
        <input name="fiat-purchase"
               value={f.dec(fiatPurchase)}
               class={style['btc-hodl']}
               placeholder="purchase amount_"
               onChange={e => this.updateFiatPurchase(e)} />
        <p class="text-sm text-gray-700">
          {fiatToWords(fiatPurchase)}
          <br />
          I would own
        </p>
        <BtcSign /> {btcBought >= 1 ? f.btc(btcBought) : f.sat(btcBought)}
        <p class="text-sm text-gray-700">
          {btcToWords(btcBought)}
        </p>
      </form>

      <h2>Everyone</h2>

      <div class="text-center">
        <p class="text-sm text-gray-700">
          world population
        </p>
        {f.dec(worldPopulation)}
        <p class="text-sm text-gray-700 mb-3">
          seven billion seven hundred million
        </p>
        <BtcSign /> {f.sat(btcPerPerson)}
        <p class="text-sm text-gray-700">
          bitcoin available for each person.
          <br />
          {btcToWords(btcPerPerson)}
        </p>
      </div>

      <h2>My Share</h2>

      <form class="text-center"
            onSubmit={e => e.preventDefault()}>
        <label for="btc-hodl">
          If I owned
        </label>
        <input name="btc-hodl"
               value={btcHodl >= 1 ? f.btc(btcHodl) : f.sat(btcHodl)}
               class={style['btc-hodl']}
               placeholder="bitcoin amount_"
               onChange={e => this.updateBtcHodl(e)} />
        <p class="text-sm text-gray-700">
          {btcToWords(btcHodl)}
          <br />
          I would own
        </p>
        {f.dec(btcHodlInIndividualShares(btcHodl))}
        <p class="text-sm text-gray-700">
          individual shares
        </p>
      </form>

      <h2>Comparing</h2>

      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <h4>per person</h4>
        <div></div>
        <h4>your amount</h4>

        <div>
          <BtcSign /> {f.sat(btcPerPerson)}
        </div>
        <div>
          bitcoin
        </div>
        <div>
          <BtcSign /> {btcHodl >= 1 ? f.btc(btcHodl) : f.sat(btcHodl)}
        </div>

        <div>
          1
        </div>
        <div class="">people</div>
        <div>
          {f.dec(btcHodlInIndividualShares(btcHodl))}
        </div>


        <div>
          {f.dec(goldPerPersonKg * TROY_OUNCE)} oz
        </div>
        <div class="">gold</div>
        <div>
          {f.dec(btcHodlInIndividualShares(btcHodl) * goldPerPersonKg * TROY_OUNCE)} oz
        </div>

        <div>
          {f.dec(btcPerPerson / usaMillionaireMedianBroadPercentInBtc)}
        </div>
        <div class="">
          millionaires
        </div>
        <div>
          {f.dec(btcHodl / usaMillionaireMedianBroadPercentInBtc)}
        </div>

        <div>
          {f.dec(btcPerPerson / netWorth1PercentMedianBroadMoneyPercentInBtc)}
        </div>
        <div class="">
          1% 
        </div>
        <div>
          {f.dec(btcHodl / netWorth1PercentMedianBroadMoneyPercentInBtc)}
        </div>

        <div>
          {f.usd(btcPerPerson * this.state.btcPrice)}
        </div>
        <div>
          <span class="text-base font-bold text-green-400">
            {f.usd(this.state.btcPrice)}
          </span>
        </div>
        <div>
          {f.usd(btcHodl* this.state.btcPrice)}
        </div>
      </div>

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
        <div>per person</div>
        <div>
          <BtcSign /> {btcPerPerson.toFixed(8)}
        </div>
      </div>

      <h3>Gold</h3>
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
        <div>per person</div>
        <div>
          <BtcSign /> {btcPerPerson.toFixed(8)}
        </div>
      </div>

      <h2>Millionaire Median</h2>
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
          {f.per(usaMillionaireMedianBroadPercent)}
        </div>
        <div>net worth</div>
        <div>
          {f.per(usaMillionaireMedianBroadPercent)}
        </div>

        <div>
          {f.usd(usaMillionaireMedian)}<sup>‡</sup>
        </div>
        <div>net worth</div>
        <div>
          <BtcSign /> {f.btc(usaMillionaireMedianBroadPercentInBtc)}
        </div>
      </div>  

      <h2>The 1% Median</h2>
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
          {f.per(netWorth1PercentMedianBroadMoneyPercent)}
        </div>
        <div>net worth</div>
        <div>
          {f.per(netWorth1PercentMedianBroadMoneyPercent)}
        </div>

        <div>
          {f.usd(netWorth1PercentMedian)}<sup>†</sup>
        </div>
        <div>net worth</div>
        <div>
          <BtcSign /> {f.btc(netWorth1PercentMedianBroadMoneyPercentInBtc)}
        </div>
      </div>




      <h2>BTC Stats</h2>
      <div class="text-center">
        Theoretical total supply <BtcSign /> {f.btc(btcTCap)}
        <br/>
        Lost estimate <BtcSign /> {f.btc(btcLost)} ({btcLostPerc * 100}%)
        <br />
        Remaining supply <BtcSign /> {f.btc(btcRemainTSupply)}
        <br />
        BTC per person <BtcSign /> {btcPerPerson.toFixed(8)}
      </div>

            <hr class="m-8" />

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
    );
  }

}
