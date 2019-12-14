import {h, Component } from 'preact';
import f from '../the-form/formatter';
import staticData from '../the-form/static-data';
import toWords from '../the-form/to-words';
import BtcSign from '../btc-sign';
import ArrSlider from '../arr-slider';
import style from './style';

const {
  UNITS,
  btcPerPerson,
  btcHodlInIndividualShares,
  goldPerPersonKg,
  usaMillionaireMedianBroadPercentInBtc,
  netWorth1PercentMedianBroadMoneyPercentInBtc,
} = staticData;

const {
  TROY_OUNCE,
} = UNITS;

const BTC_SLIDER_VALUES = [
  0.00000001,
  0.00000010,
  0.00000100,
  0.00001000,
  0.00010000,

  0.00100000,
  0.00125000,
  0.00150000,
  0.00175000,
  0.00200000,

  0.00225000,
  0.00250000,
  0.00275000,
  0.00300000,

  0.00400000,
  0.00500000,
  0.00600000,
  0.00700000,
  0.00800000,
  0.00900000,
  0.01000000,
  0.02000000,

  0.10,
  0.25,
  0.50,
  0.75,
  1,

  5,
  6.21,
  10,
  50,
  100,

  250,
  1000,
];

export default class TheFooter extends Component {

  render() {

    const {
      btcHodl,
      btcPrice,
    } = this.props;

    return (
      <div>
      <form class="text-center" onSubmit={e => e.preventDefault()}>
        <label for="btc-hodl" class="block w-0 h-0 overflow-hidden">
          bitcoin amount
        </label>
        <input id="btc-hodl"
               name="btc-hodl"
               value={'₿' + (btcHodl >= 1 ? f.btc(btcHodl) : f.sat(btcHodl))}
               class={style['btc-hodl']}
               placeholder="bitcoin amount"
               onChange={this.props.onInputChange} />

        <br />
        <ArrSlider name="btc-hodl-slider"
                   value={btcHodl}
                   values={BTC_SLIDER_VALUES}
                   updateValue={this.props.onSliderChange} />

        {toWords.btc(btcHodl)}
      </form>

      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <h4>
          1 <i class="icon-person"></i>
        </h4>
        <div></div>
        <h4>
          {f.dec(btcHodlInIndividualShares(btcHodl))} <i class="icon-person"></i>
        </h4>

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
          a millionaire's wealth
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
          a one percenter wealth
        </div>
        <div>
          {f.dec(btcHodl / netWorth1PercentMedianBroadMoneyPercentInBtc)}
          <i class="icon-person"></i>
        </div>

        <div>
          {f.usd(btcPerPerson * btcPrice)}
        </div>
        <div>
          <span class="bg-green-200 text-green-900 px-2 rounded">
            {f.usd(btcPrice)}
          </span>
        </div>
        <div>
          {f.usd(btcHodl * btcPrice)}
        </div>
      </div>
      </div>
    );
  }

}