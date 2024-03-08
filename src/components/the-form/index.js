import { h, Component } from 'preact';
import style from './style';
import f from '../../utils/formatter';
import BtcSign from '../btc-sign';
import PerPerson from '../per-person';
import InputFiat from '../input-fiat';
import TheHeader from '../the-header';
import BitcoinSection from '../bitcoin-section';
import CashSection from '../cash-section';
import SupplySection from '../supply-section';
import ArrSlider from '../arr-slider';
import Link from '../link';
import parseInputAmount from '../../utils/parse-input-amount';
import { parseBitcoin } from '../../utils/bitcoin-math';
import {
  deconstructWindowLocation,
  internalNavigate,
} from '../../utils/router';
import {
  btcToWords,
  fiatToWords,
} from '../../utils/words';
import toWords from './to-words';
import { Text } from 'preact-i18n';
import { FIAT_SLIDER_VALUES } from '../../utils/constants';
import staticData from '../../utils/static-data';
const {
  btcHodlInIndividualShares,
} = staticData;

const SAT_SIGN = ' sat';

export default class TheForm extends Component {

  updateFiatPurchase(e) {
    const input = e.target;
    const fiatPurchase = parseInputAmount(input.value);
    this.props.updateFiatPurchase(fiatPurchase);
  }

  updateBtcHodl(e) {
    const input = e.target;
    const number = parseInputAmount(input.value);
    const btcAmount = parseBitcoin(number);
    this.props.updateBtcHodl(btcAmount);
  }

  componentDidMount() {
    const locationState = deconstructWindowLocation(); 
    internalNavigate(locationState);
  }

  render() {
    const {btcHodl, btcPrice, goldPrice, fiatPurchase} = this.props;
    const btcBought = fiatPurchase / btcPrice;

    return (
      <div class="max-w-2xl mx-auto">

      <TheHeader />

      <br />
      <div class={style['loc-buttons']}>
        {this.props.children}
      </div>

      <div class="p-2 mt-6 m-auto text-justify w-11/12 max-w-md leading-loose">

        <p class="text-center">
          <Text id="intro.line-4">
            Fractions of a Bitcoin are called Satoshis.
          </Text>
        </p>

        <p class="text-center">
          <Text id="intro.explain-satoshis">
            One bitcoin is equal to one hundred million satoshis.
          </Text>
        </p>

        <div class="text-center">
          <i class="icon-bitcoin text-xl text-gray-700"></i>
          <Link queryParams={`btc=${1}`} hash='bitcoin'>
            {f.satsDecimal(1)}
          </Link>
          <span class="text-xl">
            &nbsp;&nbsp;=&nbsp;&nbsp;
          </span>
          <Link queryParams={`btc=${1}`} hash='bitcoin'>
            {f.whole(100000000)}
          </Link>
          &nbsp;satoshis
        </div>

      </div>

      <PerPerson />

      <CashSection btcBought={btcBought} >
        <InputFiat name="fiat-purchase"
                  fiatPurchase={fiatPurchase}
                  updateFiatPurchase={this.updateFiatPurchase.bind(this)}
                  updateValue={this.props.updateFiatPurchase} >

            <p class="text-xs text-center italic text-gray-500">
              {btcToWords(btcBought)}
            </p>

            <table class="text-sm text-gray-700 italic mb-4 w-3/4 mx-auto">
              <tr>
                <td class="text-right">
                  {f.usd(fiatPurchase)} /
                  <span class="price-synced-amount">
                    {f.usd(btcPrice)}
                  </span>
                  =&nbsp;&nbsp;
                </td>

                <td class="text-left">
                  <Link queryParams={`btc=${btcBought.toFixed(8)}`} hash='bitcoin'>
                    <BtcSign />
                    {f.satsDecimal(btcBought)}
                  </Link>
                </td>
              </tr>
              <tr>
                <td></td>
                <td class="text-left">
                  {f.dec(btcHodlInIndividualShares(btcBought))} <i class="icon-person"></i>
                </td>
              </tr>
            </table>
        </InputFiat>

      </CashSection>

      <BitcoinSection btcHodl={btcHodl} btcPrice={btcPrice} goldPrice={goldPrice}
                      onInputChange={this.updateBtcHodl.bind(this)}
                      onSliderChange={this.props.updateBtcHodl} />

      <SupplySection fiatPurchase={fiatPurchase}
                     goldPrice={goldPrice}
                     btcBought={btcBought}>

        <form class="text-center" onSubmit={e => e.preventDefault()}>

          <label for="fiat-purchase-supply" class="block w-0 h-0 overflow-hidden">
            fiat amount
          </label>
          <input id="fiat-purchase-supply"
                name="fiat-purchase-supply"
                value={'$' + f.dec(fiatPurchase)}
                class="text-center bg-blue-100 w-full"
                placeholder="dollar amount"
                onChange={(e) => this.updateFiatPurchase(e)} />
          <br />
          <span class="text-green-900">
            {'₿' + f.btc(btcBought)}
          </span>

        </form>

      </SupplySection>

      </div>
    );
  }

}
