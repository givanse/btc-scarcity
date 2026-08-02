/** @jsx h */
import { h, Component } from 'preact';
import style from './style.module.css';
import f from '../../utils/formatter';
import PerPerson from '../per-person';
import TheHeader from '../the-header';
import BitcoinSection from '../bitcoin-section';
import CashSection from '../cash-section';
import SupplySection from '../supply-section';
import Link from '../link';
import parseInputAmount from '../../utils/parse-input-amount';
import { parseBitcoin } from '../../utils/bitcoin-math';
import {
  deconstructWindowLocation,
  internalNavigate,
} from '../../utils/router';
import { Text } from 'preact-i18n';

export default class TheForm extends Component {

  onFiatPurchase(e) {
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
    const {btcHodl, btcPrice, fiatPurchase} = this.props;
    const btcBought = btcPrice > 0 ? fiatPurchase / btcPrice : 0;

    return (
      <div class="max-w-2xl mx-auto">

      <TheHeader />

      <br />
      <div class={style['loc-buttons']}>
        {this.props.children}
      </div>

      <div class="p-2 mt-6 m-auto text-justify w-11/12 max-w-md leading-loose">

        <p class="text-center">
          <Text id="intro.explain">
            One bitcoin can be divided into one hundred million units.
          </Text>
        </p>

        <div class="text-center">
          <Link queryParams={`btc=${1}`} hash='bitcoin' classNames='btc'>
            {f.dec(1)} bitcoin
          </Link>
          <span class="text-xl">
            &nbsp;&nbsp;=&nbsp;&nbsp;
          </span>
          <i class="icon-bitcoin text-xl text-btc-orange"></i>
          <Link queryParams={`btc=${1}`} hash='bitcoin' classNames='btc'>
            {f.whole(100000000)}
          </Link>
        </div>

      </div>

      <PerPerson />

      <CashSection onFiatPurchase={this.onFiatPurchase}
                   updateFiatPurchase={this.props.updateFiatPurchase}
                   fiatPurchase={fiatPurchase}
                   btcBought={btcBought}
                   btcPrice={btcPrice} />

      <BitcoinSection btcHodl={btcHodl} btcPrice={btcPrice}
                      onInputChange={this.updateBtcHodl.bind(this)}
                      onSliderChange={this.props.updateBtcHodl} />

      <SupplySection fiatPurchase={fiatPurchase}
                     btcBought={btcBought} />

      </div>
    );
  }

}
