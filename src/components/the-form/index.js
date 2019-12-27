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
} from './words';
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
    const {btcHodl, btcPrice, fiatPurchase} = this.props;
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

      <div id="world" class="block pt-4">
        <a href="#world" class="cursor-pointer">
          <h2 class="bg-blue-600 text-white ">
            <Text id="world.title">Worldwide</Text>
          </h2>
        </a>
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
          <p class="text-sm text-gray-700">
            {fiatToWords(fiatPurchase)} <Text id="cash.could-buy-me">could buy me</Text>
          </p>
          <Link queryParams={`btc=${btcBought.toFixed(8)}`} hash='bitcoin'>
            {toWords.btc(btcBought)}
          </Link>
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


      <div id="bitcoin" class="block pt-4">
        <a href="#bitcoin" class="cursor-pointer">
          <h2 class="background-btc-orange text-black font-bold">
            Bitcoin
          </h2>
        </a>
      </div>

      <BitcoinSection btcHodl={btcHodl} btcPrice={btcPrice}
                      onInputChange={this.updateBtcHodl.bind(this)}
                      onSliderChange={this.props.updateBtcHodl} />

      <div id="supply" class="block pt-4">
        <a href="#supply" class="cursor-pointer">
          <h2 class="bg-purple-700 text-white ">
            <Text id="supply.title">Supply</Text>
          </h2>
        </a>
      </div>

      <form class="text-center" onSubmit={e => e.preventDefault()}>

        <table class="w-full table-fixed">
          <tr>
            <td class="w-6/12 overflow-hidden">
              <label for="fiat-purchase-supply" class="block w-0 h-0 overflow-hidden">
                fiat amount
              </label>
              <input id="fiat-purchase-supply"
                     name="fiat-purchase-supply"
                     value={'$' + f.dec(fiatPurchase)}
                     class="text-center bg-blue-100 w-full"
                     placeholder="dollar amount"
                     onChange={(e) => this.updateFiatPurchase(e)} />
            </td>

            <td class="w-6/12">
              <span class="text-green-900">
                {'₿' + f.btc(btcBought)}
              </span>
            </td>
          </tr>
        </table>

        <ArrSlider name={"fiat-purchase-supply" + "-input-range"}
                   value={fiatPurchase}
                   values={FIAT_SLIDER_VALUES}
                   updateValue={this.props.updateFiatPurchase} />
      </form>

      <SupplySection fiatPurchase={fiatPurchase}
                     btcBought={btcBought} />

      <hr class="my-24 mx-8" />

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
