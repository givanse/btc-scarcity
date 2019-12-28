import {h, Component } from 'preact';
import f from '../../utils/formatter';
import staticData from '../../utils/static-data';
import toWords from '../the-form/to-words';
import BtcSign from '../btc-sign';
import ArrSlider from '../arr-slider';
import style from './style';
import { MarkupText, Text } from 'preact-i18n';
import parseInputAmount from '../../utils/parse-input-amount';
import { getSats } from '../../utils/bitcoin-math';
import { BTC_SLIDER_VALUES } from '../../utils/constants';
import {
  btcToWords,
  numberToWords,
} from '../../utils/words';

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

    const satsHodlText = satsHodl ? 
                         numberToWords(satsHodl) + ' ' + (satsHodl === 1 ? 'Satoshi' : 'Satoshis')
                         : '';
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
               value={'₿' + f.btc(btcHodl)}
               class={style['btc-hodl']}
               placeholder="bitcoin amount"
               onInput={onInputChange} />

        <p class="text-sm text-gray-700">
          {satsHodlText}
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

      <table class={style["comparison"]}>

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
            <BtcSign /> {f.btc(btcPerPerson)}
            <br />
            <span class="price-synced-amount">
              {f.usd(btcPerPerson * btcPrice)}
            </span>
          </td>
          <td>
            <BtcSign /> {f.btc(btcHodl)}
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
