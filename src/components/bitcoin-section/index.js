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
} from '../../utils/words';

const SAT_SIGN = ' sat';

const {
  btcPerPerson,
  btcHodlInIndividualShares,
  goldPerPersonOz,
  usaMillionaireAverageBroadPercentInBtc,
  netWorth1PercentMedianBroadMoneyPercentInBtc,
} = staticData;

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
      goldPrice,
      onInputChange,
    } = this.props;

    const {btc, sats} = getSats(btcHodl); 
    const satsHodl = (btc * HUNDRED_M) + sats;

    const proportionalToBTCGoldSharesOz = btcHodlInIndividualShares(btcHodl) * goldPerPersonOz;

    return (
      <div>

      <div id="bitcoin" class="block pt-4">
        <a href="#bitcoin" class="cursor-pointer">
          <h2 class="background-btc-orange text-black font-bold">
            Bitcoin
          </h2>
        </a>
      </div>

      <form class="text-center" onSubmit={e => e.preventDefault()}>

        <p class="text-sm text-gray-700">
          {toWords.btc(btcHodl)}
        </p>

        <label for="btc-hodl" class="block w-0 h-0 overflow-hidden">
          bitcoin <Text id="amount">amount</Text>
        </label>
        <input id="btc-hodl"
              name="btc-hodl"
              value={'₿' + f.btc(btcHodl)}
              class={style['btc-hodl']}
              placeholder="bitcoin amount"
              onChange={onInputChange} />

        <ArrSlider name="btc-hodl-slider"
                   value={btcHodl}
                   values={BTC_SLIDER_VALUES}
                   updateValue={this.props.onSliderChange} />

        <p class="text-sm text-gray-700">
          {btcToWords(btcHodl)}
        </p>
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
            <span class="text-green-900">
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
            <br/>
            <span class="text-green-900">
              {f.usd(goldPrice)}
            </span>
          </td>
        </tr>

        <tr>
          <td>
            {f.dec(goldPerPersonOz)} oz
            <br />
            <span class="price-synced-amount">
              {f.usd(goldPerPersonOz * goldPrice)}
            </span>
          </td>
          <td>
            {f.dec(proportionalToBTCGoldSharesOz)} oz
            <br />
            <span class="price-synced-amount">
              {f.usd(proportionalToBTCGoldSharesOz * goldPrice)}
            </span>
          </td>
        </tr>

        <tr class="bg-gray-300 text-sm">
          <td colSpan="2">
            <Text id="millionaire-wealth">a millionaire's wealth</Text>
          </td>
        </tr>

        <tr>
          <td>
            {f.decSmall(btcPerPerson / usaMillionaireAverageBroadPercentInBtc)}
            <i class="icon-person"></i>
          </td>
          <td>
            {f.decSmall(btcHodl / usaMillionaireAverageBroadPercentInBtc)}
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
