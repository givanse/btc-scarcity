import {h, Component } from 'preact';
import f from '../../utils/formatter';
import staticData from '../../utils/static-data';
import Link from '../link';
import ArrSlider from '../arr-slider';
import style from './style';
import { Text } from 'preact-i18n';
import parseInputAmount from '../../utils/parse-input-amount';
import { getSats } from '../../utils/bitcoin-math';
import { BTC_SLIDER_VALUES } from '../../utils/constants';
import {
  btcToWords,
} from '../../utils/words';

const {
  btcHodlInIndividualShares,
  mMillionaireBroadPercentInBtc,
  pointOnePercenterWealthPercentInBtc,
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
      onInputChange,
    } = this.props;

    const {btc, sats} = getSats(btcHodl); 
    const satsHodl = (btc * HUNDRED_M) + sats;

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

        <label for="btc-hodl" class="block w-0 h-0 overflow-hidden">
          bitcoin <Text id="amount">amount</Text>
        </label>
        <input id="btc-hodl"
              name="btc-hodl"
              value={f.satsDecimal(btcHodl)}
              class={style['btc-hodl']}
              placeholder="bitcoin amount"
              onChange={onInputChange} />

        <table class="text-sm text-gray-500 italic mb-4 mx-auto">
          <tr>
            <td class="text-right">
              <i class="icon-bitcoin"></i>
              {f.satsDecimal(btcHodl)}&nbsp;
              x
              <span class="price-synced-amount">{f.usd(btcPrice)}</span>
              =&nbsp;&nbsp;
            </td>

            <td class="text-left">
              <Link queryParams={`fiat=${(btcHodl * btcPrice).toFixed(2)}`} hash='cash' classNames='fiat'>
                {f.usd(btcHodl * btcPrice)}
              </Link>
            </td>
          </tr>
        </table>

        <p class={style['to-words']}>
          {btcToWords(btcHodl)}
        </p>

        <table class={style["comparison"]}>
          <tr>
            <td>
              <Text id="bitcoin.individual-world-share">
                adult share
              </Text>
            </td>

            <td>
              <i class="icon-person"></i>
              {f.dec(btcHodlInIndividualShares(btcHodl))}
            </td>
          </tr>

          <tr>
            <td>
              <Text id="millionaire-average">millionaire share</Text>
            </td>

            <td>
              <i class="icon-person"></i>
              {f.decSmall(btcHodl / mMillionaireBroadPercentInBtc)}
            </td>
          </tr>

          <tr>
            <td>
              <Text id="percenter-wealth">
                one-percenter share 
              </Text>
            </td>

            <td>
              <i class="icon-person"></i>
              {f.decSmall(btcHodl / pointOnePercenterWealthPercentInBtc)}
            </td>
          </tr>
        </table>

        <ArrSlider name="btc-hodl-slider"
                   value={btcHodl}
                   values={BTC_SLIDER_VALUES}
                   updateValue={this.props.onSliderChange}>
          {f.btc(BTC_SLIDER_VALUES[0])}
          {f.btc(BTC_SLIDER_VALUES[BTC_SLIDER_VALUES.length - 1])}
        </ArrSlider>

      </form>

      </div>
    );
  }

}
