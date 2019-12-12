import { h, Component } from 'preact';
import style from './style';
import f from './formatter';
import staticData from './static-data';
import BtcSign from '../btc-sign';
import ArrSlider from '../arr-slider';
import LogBarChart from '../log-bar-chart';
import PerPerson from '../per-person';
import InputFiat from '../input-fiat';
import {
  fiatToWords,
} from './words';
import { fetchBtcPrice } from './fetch-btc';
import {
  readQueryParams,
  updateQueryParams,
} from './query-params';
import toWords from './to-words';
import {
  BTC_SLIDER_VALUES,
} from './sliders-values';

//TODO: need a `sats` character
const SAT_SIGN = ' sat';

const {
  UNITS,
  btcTCap,
  btcLostPerc,
  btcLost,
  btcRemainTSupply,
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

function verboseFiatPurchase() {
  return (
    <div>
      <p>
      <BtcSign />{f.btc(1)} = {f.btc(100000000)}{SAT_SIGN}
      </p>
      <p class="text-sm text-gray-700 mb-3">
        one Bitcoin = one hundred million Satoshis
      </p>
    </div>
  );
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
        const {btc, fiatPurchase} = event.state; 
        this.setSearchState(btc, fiatPurchase);
      }
    }
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
      const s = Object.assign({}, state);
      s.fiatPurchase = fiatAmount;

      updateQueryParams(s);

      return s;
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

      <a name="fiat">
        <h2 class="background-money text-white mb-8">
          Purchasing Power
        </h2>
      </a>

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

      <a name="person">
        <h2 class="bg-blue-600 text-white my-8">
          Per Person
        </h2>
      </a>

      <PerPerson />

      <a name="bitcoin">
        <h2 class="background-btc-orange text-black font-bold my-8">
          Bitcoin
        </h2>
      </a>

      <form class="text-center" onSubmit={e => e.preventDefault()}>
        <label for="btc-hodl" class="block w-0 h-0 overflow-hidden">
          bitcoin amount
        </label>
        <input id="btc-hodl"
               name="btc-hodl"
               value={'₿' + (btcHodl >= 1 ? f.btc(btcHodl) : f.sat(btcHodl))}
               class={style['btc-hodl']}
               placeholder="bitcoin amount"
               onChange={e => this.updateBtcHodl(e)} />

        <br />
        <ArrSlider name="btc-hodl-slider"
                   value={btcHodl}
                   values={BTC_SLIDER_VALUES}
                   updateValue={this._updateBtcHodl.bind(this)} />

        {toWords.btc(btcHodl)}
      </form>

      <h2>comparing</h2>

      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <h4>per person</h4>
        <div></div>
        <h4>your amount</h4>

        <div>
          1 <i class="icon-person"></i>
        </div>
        <div class="">
          per person
        </div>
        <div>
          {f.dec(btcHodlInIndividualShares(btcHodl))} <i class="icon-person"></i>
        </div>

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
          {f.dec(goldPerPersonKg * TROY_OUNCE)} oz
        </div>
        <div class="">gold</div>
        <div>
          {f.dec(btcHodlInIndividualShares(btcHodl) * goldPerPersonKg * TROY_OUNCE)} oz
        </div>

        <div>
          {f.dec(btcPerPerson / usaMillionaireMedianBroadPercentInBtc)}
          <i class="icon-person"></i>
        </div>
        <div class="">
          millionaires
        </div>
        <div>
          {f.dec(btcHodl / usaMillionaireMedianBroadPercentInBtc)}
          <i class="icon-person"></i>
        </div>

        <div>
          {f.dec(btcPerPerson / netWorth1PercentMedianBroadMoneyPercentInBtc)}
          <i class="icon-person"></i>
        </div>
        <div class="">
          1% 
        </div>
        <div>
          {f.dec(btcHodl / netWorth1PercentMedianBroadMoneyPercentInBtc)}
          <i class="icon-person"></i>
        </div>

        <div>
          {f.usd(btcPerPerson * this.state.btcPrice)}
        </div>
        <div>
          <span class="bg-green-200 text-green-900 px-2 rounded">
            {f.usd(this.state.btcPrice)}
          </span>
        </div>
        <div>
          {f.usd(btcHodl * this.state.btcPrice)}
        </div>
      </div>

      <a name="supply">
        <h2 class="bg-purple-700 text-white my-8">
          Supply
        </h2>
      </a>

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
      <div class="text-center">
        Theoretical total supply <BtcSign /> {f.btc(btcTCap)}
        <br/>
        Lost estimate <BtcSign /> {f.btc(btcLost)} ({btcLostPerc * 100}%)
        <br />
        Remaining supply <BtcSign /> {f.btc(btcRemainTSupply)}
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
