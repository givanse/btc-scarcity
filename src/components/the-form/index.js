import { h, Component } from 'preact';
import style from './style';
import f from './formatter';
import staticData from './static-data';
import BtcSign from '../btc-sign';
import ArrSlider from '../arr-slider';
import {
  fiatToWords,
  btcToWords,
} from './words';
import { fetchBtcPrice } from './fetch-btc';
import {
  readQueryParams,
  updateQueryParams,
} from './query-params';
import toWords from './to-words';

const P = f.PRECISION;

const BTC_SLIDER_VALUES = [
  0.00000001,
  0.00000010,
  0.00000015,
  0.00000100,
  0.00000150,

  0.00001000,
  0.00001500,
  0.00010000,
  0.00015000,
  0.00100000,

  0.00150000,
  0.01000000,
  0.01500000,
  0.10,
  0.20,

  0.50,
  0.75,
  1,
  5,
  10,
];

const FIAT_SLIDER_VALUES = [
  1,
  2,
  5,
  10,
  15,

  20,
  25,
  30,
  35,
  40,

  45,
  50,
  75,
  100,
  125,

  150,
  200,
  250,
  500,
  1000,
];

//TODO: need a `sats` character
const SAT_SIGN = 'sat';

const {
  UNITS,
  btcTCap,
  btcLostPerc,
  btcLost,
  btcRemainTSupply,
  worldPopulation,
  btcPerPerson,
  btcHodlInIndividualShares,
  btcPercOfRemainTSupply,
  fiatPercOfBroadMoney,
  fiatPercOfGold,
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
    btcHodl: 0.00000001,
    btcPrice: 7000,
    fiatPurchase: 1,
  };

  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      window.onpopstate = (event) => {
        const {btc, fiatPurchase} = event.state; 
        this.setSearchState(btc, fiatPurchase);
      }
    }
  }

  updateFiatPurchase(e) {
    const input = e.target;
    let fiatPurchase = Number.parseFloat(input.value);
    fiatPurchase = Number.isNaN(fiatPurchase) ? 0 : fiatPurchase;

    this._updateFiatPurchase(fiatPurchase);
  }

  _updateFiatPurchase(fiatAmount) {
    this.setState((state, props) => {
      const s = Object.assign({}, state);
      s.fiatPurchase = fiatAmount;

      updateQueryParams(s);

      return s;
    });
  }

  updateBtcHodl(e) {
    const input = e.target;
    let number = Number.parseFloat(input.value);
    number = Number.isNaN(number) ? 0 : number;
    this._updateBtcHodl(number);
  }

  _updateBtcHodl(btcAmount) {
    this.setState((state, props) => {
      const s = Object.assign({}, state);
      s.btcHodl = btcAmount;

      updateQueryParams(s);

      return s;
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
      const s = Object.assign({}, state);
      s.btcPrice = btcPrice;
      return s;
    });
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
    const {btc, fiatPurchase} = readQueryParams(this.state);
    this.setSearchState(btc, fiatPurchase);
  }

  render() {
    const { btcHodl, btcPrice, fiatPurchase } = this.state;
    const btcBought = fiatPurchase / btcPrice;

    return (
      <div>

      <h2 class="background-btc-orange text-white">Bitcoin</h2>

      <form class="text-center"
            onSubmit={e => e.preventDefault()}>
        <p class="">
          If I were to buy today
        </p>
        <input name="fiat-purchase"
               value={f.dec(fiatPurchase)}
               class={style['btc-hodl']}
               placeholder="purchase amount_"
               onChange={e => this.updateFiatPurchase(e)} />

        <br />
        <ArrSlider name="fiat-purchase-range"
                   value={fiatPurchase}
                   values={FIAT_SLIDER_VALUES}
                   updateValue={this._updateFiatPurchase.bind(this)} />

        <p class="mb-4">
          {fiatToWords(fiatPurchase)} worth of Bitcoin
        </p>

        <p class="text-sm text-gray-700">
          I would own
        </p>
        {toWords.btc(btcBought)}
        <p class="text-sm text-gray-700 italic mb-4">
          {f.usd(fiatPurchase)} / {f.usd(btcPrice)} =
          &nbsp;<BtcSign /> {btcBought >= 1 ? f.btc(btcBought) : f.sat(btcBought)}
        </p>

        <p>
        <BtcSign />{f.btc(1)} = {f.btc(100000000)}{SAT_SIGN}
        </p>
        <p class="text-sm text-gray-700 mb-3">
          one Bitcoin = one hundred million Satoshis
        </p>
      </form>

      <h2>
        supply %
      </h2>

      <div class="text-center">
        broad money {f.per(fiatPercOfBroadMoney(fiatPurchase))}
        <br />
        gold {f.per(fiatPercOfGold(fiatPurchase))}
        <br />
        btc {f.per(btcPercOfRemainTSupply(btcBought))}
      </div>

      <h2>
        per person
      </h2>

      <div class="text-center">
        <p class="text-sm text-gray-700">
          world population
        </p>
        {f.dec(worldPopulation)}
        <p class="text-sm text-gray-700 mb-3">
          seven billion seven hundred million
        </p>

        <p class="text-sm text-gray-700">
          bitcoin supply
        </p>
        <BtcSign /> {f.btc(btcRemainTSupply)}
        <p class="text-sm text-gray-700 mb-3">
          {btcToWords(btcRemainTSupply)}
        </p>

        <p class="text-sm text-gray-700">
          bitcoin available for each person
          <br />
          <BtcSign /> {f.dec(btcRemainTSupply, P.MILLION.name)} / {f.dec(worldPopulation, P.BILLION.name)} =
          &nbsp;<BtcSign /> {f.sat(btcPerPerson)}
        </p>
        {toWords.btc(btcPerPerson)}
      </div>

      <h2>my share</h2>

      <form class="text-center"
            onSubmit={e => e.preventDefault()}>
        <label for="btc-hodl">
          If I owned today
        </label>
        <br />
        <input name="btc-hodl"
               value={btcHodl >= 1 ? f.btc(btcHodl) : f.sat(btcHodl)}
               class={style['btc-hodl']}
               placeholder="bitcoin amount_"
               onChange={e => this.updateBtcHodl(e)} />

        <br />
        <ArrSlider name="btc-hodl-range"
                   value={btcHodl}
                   values={BTC_SLIDER_VALUES}
                   updateValue={this._updateBtcHodl.bind(this)} />

        {toWords.btc(btcHodl)}

        <p class="text-sm text-gray-700">
          <br />
          I would own
        </p>
        {f.dec(btcHodlInIndividualShares(btcHodl))}
        <p class="text-sm text-gray-700">
          individual shares
        </p>
      </form>

      <h2>comparing</h2>

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
        <div class="">shares</div>
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




      <h2>Bitcoin Stats</h2>
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
