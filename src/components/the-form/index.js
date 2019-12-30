import { h, Component } from 'preact';
import style from './style';
import f from '../../utils/formatter';
import staticData from '../../utils/static-data';
import BtcSign from '../btc-sign';
import PerPerson from '../per-person';
import InputFiat from '../input-fiat';
import TheHeader from '../the-header';
import BitcoinSection from '../bitcoin-section';
import SupplySection from '../supply-section';
import ArrSlider from '../arr-slider';
import Link from '../link';
import parseInputAmount from '../../utils/parse-input-amount';
import { parseBitcoin } from '../../utils/bitcoin-math';
import {
  btcToWords,
  fiatToWords,
} from '../../utils/words';
import toWords from './to-words';
import { Text } from 'preact-i18n';
import { FIAT_SLIDER_VALUES } from '../../utils/constants';

const {
  btcPerPerson,
  btcHodlInIndividualShares,
} = staticData;

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

  render() {
    const {btcHodl, btcPrice, goldPrice, fiatPurchase} = this.props;
    const btcBought = fiatPurchase / btcPrice;

    return (
      <div class="max-w-2xl mx-auto">

      <TheHeader />

      <div class={style['loc-buttons']}>
        {this.props.children}
      </div>

      <div class="p-2 mt-6 m-auto text-justify w-11/12 max-w-md leading-loose">

        <p class="mb-6">
          <Text id="intro.line-3">
            Do you know you can buy fractions of a Bitcoin?
          </Text>
          &nbsp;<Text id="intro.line-4">
            Fractions of a Bitcoin are called Satoshis.
          </Text>
        </p>

        <p class="mt-6 mb-4 font-mono text-center">
          <Text id="intro.line-5">
            learn all about it here
          </Text>
        </p>

      </div>

      <PerPerson />


      <div id="cash" class="block pt-4">
        <a href="#cash" class="cursor-pointer">
          <h2 class="background-money text-white">
            <Text id="cash.title">Cash</Text>
          </h2>
        </a>
      </div>

      <InputFiat name="fiat-purchase"
                 fiatPurchase={fiatPurchase}
                 updateFiatPurchase={this.updateFiatPurchase.bind(this)}
                 updateValue={this.props.updateFiatPurchase} >
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

      <div class="text-center text-sm text-gray-700 italic mb-4">
        {f.usd(fiatPurchase)} /
        <span class="price-synced-amount">
          {f.usd(btcPrice)}
        </span> = <BtcSign />{f.btc(btcBought)}
      </div>

      <table class="w-9/12 text-center m-auto md:max-w-xl">
        <tr>
          <td class="text-xl">
            1 <i class="icon-person"></i>
          </td>
          <td class="text-xl">
            {f.dec(btcHodlInIndividualShares(btcBought))} <i class="icon-person"></i>
          </td>
        </tr>

        <tr>
          <td>
            <BtcSign />{f.btc(btcPerPerson)}
          </td>
          <td>
            <span class="price-synced-amount">
              <BtcSign />{f.btc(btcBought)}
            </span>
          </td>
        </tr>
      </table>

      <BitcoinSection btcHodl={btcHodl} btcPrice={btcPrice} goldPrice={goldPrice}
                      onInputChange={this.updateBtcHodl.bind(this)}
                      onSliderChange={this.props.updateBtcHodl} />

      <div id="supply" class="block pt-4">
        <a href="#supply" class="cursor-pointer">
          <h2 class="bg-purple-700 text-white ">
            <Text id="supply.title">Supply</Text>
          </h2>
        </a>
      </div>

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
