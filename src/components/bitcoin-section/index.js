import {h, Component } from 'preact';
import f from '../the-form/formatter';
import staticData from '../the-form/static-data';
import toWords from '../the-form/to-words';
import BtcSign from '../btc-sign';
import ArrSlider from '../arr-slider';
import style from './style';
import { MarkupText, Text } from 'preact-i18n';
import parseInputAmount from '../../utils/parse-input-amount';
import getSats from '../../utils/get-sats';
import {
  btcToWords,
  numberToWords,
} from '../the-form/words';

const SAT_SIGN = ' sat';

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
  0.20,
  0.25,
  0.30,
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

const HUNDRED_M = 100000000;

export default class TheFooter extends Component {

  updateSatsHodl(e) {
    const input = e.target;
    const number = parseInputAmount(input.value);

    const btc = number / HUNDRED_M;
    this.props.onSliderChange(btc);
  }

  render() {

    const {
      btcHodl,
      btcPrice,
      onInputChange,
    } = this.props;

    const {btc, sats} = getSats(btcHodl); 
    const satsHodl = (btc * HUNDRED_M) + sats;

    return (
      <div>
      <form class="text-center" onSubmit={e => e.preventDefault()}>

        <p class="text-sm text-gray-700">
          {btcToWords(btcHodl)}
        </p>

        <label for="btc-hodl" class="block w-0 h-0 overflow-hidden">
          bitcoin <Text id="amount">amount</Text>
        </label>
        <input id="btc-hodl"
               name="btc-hodl"
               value={'₿' + (btcHodl >= 1 ? f.btc(btcHodl) : f.sat(btcHodl))}
               class={style['btc-hodl']}
               placeholder="bitcoin amount"
               onChange={onInputChange} />

        <p class="text-sm text-gray-700">
          {numberToWords(satsHodl) + ' ' + (satsHodl === 1 ? 'Satoshi' : 'Satoshis')}
        </p>

        <label for="sats-hodl" class="block w-0 h-0 overflow-hidden">
          satoshis <Text id="amount">amount</Text>
        </label>
        <input id="sats-hodl"
               name="sats-hodl"
               value={f.dec(satsHodl) + ' ' + SAT_SIGN}
               class={style['btc-hodl']}
               placeholder="satoshis amount"
               onChange={(e) => this.updateSatsHodl(e)} />

        <ArrSlider name="btc-hodl-slider"
                   value={btcHodl}
                   values={BTC_SLIDER_VALUES}
                   updateValue={this.props.onSliderChange} />

        {toWords.btc(btcHodl)}
      </form>

      <table class="w-11/12 text-center md:max-w-xl m-4 mt-8 mx-auto">

        <tr>
          <td class="text-xl">
            1 <i class="icon-person"></i>
            <br />
            <span class="text-sm leading-none">
              <MarkupText id="qty-per-person">quantity per person</MarkupText>
            </span>
          </td>
          <td class="text-xl">
            {f.dec(btcHodlInIndividualShares(btcHodl))} <i class="icon-person"></i>
            <br />
            <span class="text-sm">
              <Text id="persons-per-qty">persons per quantity</Text>
            </span>
          </td>
        </tr>

        <tr class="bg-gray-300 text-sm">
          <td colSpan="2">
            bitcoin
            <br/>
            &nbsp;<span class="text-green-900">
              {f.usd(btcPrice)}
            </span>
          </td>
        </tr>

        <tr>
          <td>
            <BtcSign /> {f.sat(btcPerPerson)}
            <br />
            <span class="price-synced-amount">
              {f.usd(btcPerPerson * btcPrice)}
            </span>
          </td>
          <td>
            <BtcSign /> {btcHodl >= 1 ? f.btc(btcHodl) : f.sat(btcHodl)}
            <br />
            <span class="price-synced-amount">
              {f.usd(btcHodl * btcPrice)}
            </span>
          </td>
        </tr>

        <tr class="bg-gray-300 text-sm">
          <td colSpan="2">
            <Text id="mined-gold">gold</Text>
          </td>
        </tr>

        <tr>
          <td>
            {f.dec(goldPerPersonKg * TROY_OUNCE)} oz
          </td>
          <td>
            {f.dec(btcHodlInIndividualShares(btcHodl) * goldPerPersonKg * TROY_OUNCE)} oz
          </td>
        </tr>

        <tr class="bg-gray-300 text-sm">
          <td colSpan="2">
            <Text id="millionaire-wealth">a millionaire's wealth</Text>
          </td>
        </tr>

        <tr>
          <td>
            {f.decSmall(btcPerPerson / usaMillionaireMedianBroadPercentInBtc)}
            <i class="icon-person"></i>
          </td>
          <td>
            {f.decSmall(btcHodl / usaMillionaireMedianBroadPercentInBtc)}
            <i class="icon-person"></i>
          </td>
        </tr>

        <tr class="bg-gray-300 text-sm">
          <td colSpan="2">
            <Text id="percenter-wealth">
              a one percenter wealth
            </Text>
          </td>
        </tr>

        <tr>
          <td>
            {f.decSmall(btcPerPerson / netWorth1PercentMedianBroadMoneyPercentInBtc, 3)}
            <i class="icon-person"></i>
          </td>
          <td>
            {f.decSmall(btcHodl / netWorth1PercentMedianBroadMoneyPercentInBtc)}
            <i class="icon-person"></i>
          </td>
        </tr>
      </table>
      </div>
    );
  }

}
