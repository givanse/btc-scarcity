import {h, Component } from 'preact';
import style from './style';
import f from '../../utils/formatter';
import ArrSlider from '../arr-slider';
import { FIAT_SLIDER_VALUES } from '../../utils/constants';
import Link from '../link';
import { Text } from 'preact-i18n';
import {
  btcToWords,
} from '../../utils/words';
import staticData from '../../utils/static-data';

const {
  btcHodlInIndividualShares,
} = staticData;

export default class InputFiat extends Component {

  render() {
    const {
      fiatPurchase,
      onFiatPurchase,
      updateValue,
      name,
      btcBought,
      btcPrice,
    } = this.props;

    return (
      <form class="text-center" onSubmit={e => e.preventDefault()}>

        <label for={name} class="block w-0 h-0 overflow-hidden">
          fiat amount
        </label>
        <input id={name}
               name={name}
               value={'$' + f.dec(fiatPurchase)}
               class={style['btc-hodl']}
               placeholder="dollar amount"
               onChange={(e) => onFiatPurchase(e)} />

        <table class="text-sm text-gray-500 italic mb-4 w-3/4 mx-auto">
          <tr>
            <td class="text-right">
              {f.usd(fiatPurchase)} /
              <span class="price-synced-amount">
                {f.usd(btcPrice)}
              </span>
              =&nbsp;&nbsp;
            </td>

            <td class="text-left">
              <Link queryParams={`btc=${btcBought.toFixed(8)}`} hash='bitcoin' classNames='btc'>
                <i class="icon-bitcoin"></i>
                {f.satsDecimal(btcBought)}
              </Link>
            </td>
          </tr>
        </table>

        <p class={style['to-words']}>
          {btcToWords(btcBought)}
        </p>

        <table class={style["comparison"]}>
          <tr>
            <td>
              <Text id="bitcoin.individual-world-share">
                world share per individual
              </Text>
            </td>

            <td>
              <i class="icon-person"></i>
              {f.dec(btcHodlInIndividualShares(btcBought))}
            </td>
          </tr>
        </table>

        <ArrSlider name={name + "-input-range"}
                   value={fiatPurchase}
                   values={FIAT_SLIDER_VALUES}
                   updateValue={updateValue}>
          {f.usd(FIAT_SLIDER_VALUES[0])}
          {f.usd(FIAT_SLIDER_VALUES[FIAT_SLIDER_VALUES.length - 1])}
        </ArrSlider>
      </form>
    );
  }

}
