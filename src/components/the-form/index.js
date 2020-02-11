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

      <div class="p-2 mt-12 m-auto text-justify w-11/12 max-w-md leading-loose">

        <p class="mb-6">
          <Text id="intro.line-3">
            Do you know you can buy fractions of a Bitcoin?
          </Text>
          &nbsp;<Text id="intro.line-4">
            Fractions of a Bitcoin are called Satoshis.
          </Text>
        </p>

        <p class="mt-6 mb-4 font-mono text-center">
          <Link hash='world'>
            <Text id="intro.line-5">
              learn all about it here
            </Text>
          </Link>
        </p>

      </div>

      <div class={style['loc-buttons']}>
        {this.props.children}
      </div>

      <PerPerson />

      <CashSection btcBought={btcBought} >
        <InputFiat name="fiat-purchase"
                  fiatPurchase={fiatPurchase}
                  updateFiatPurchase={this.updateFiatPurchase.bind(this)}
                  updateValue={this.props.updateFiatPurchase} >
            <div class="text-center text-sm text-gray-700 italic mb-4">
              {f.usd(fiatPurchase)} /
              <span class="price-synced-amount">
                {f.usd(btcPrice)}
              </span> = <BtcSign />{f.btc(btcBought)}
            </div>
            <Link queryParams={`btc=${btcBought.toFixed(8)}`} hash='bitcoin'>
              {toWords.btc(btcBought)}
            </Link>
            <p class="text-sm text-gray-700">
              {fiatToWords(fiatPurchase)} <Text id="cash.could-buy-me">could buy me</Text>
            </p>
            <p class="text-sm text-gray-700">
              {btcToWords(btcBought)}
            </p>
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

          <ArrSlider name={"fiat-purchase-supply" + "-input-range"}
                    value={fiatPurchase}
                    values={FIAT_SLIDER_VALUES}
                    updateValue={this.props.updateFiatPurchase} />
        </form>

      </SupplySection>

      </div>
    );
  }

}
