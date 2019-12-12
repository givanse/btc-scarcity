import {h, Component } from 'preact';
import style from './style';
import BtcSign from '../btc-sign';
import staticData from '../the-form/static-data';
import f from '../the-form/formatter';
import {
  numberToWords,
} from '../the-form/words';

const SAT_SIGN = ' sat';

const {
  btcTCap,
  btcLostPerc,
  btcLost,
  btcRemainTSupply,
} = staticData;

function verboseFiatPurchase() {
  return (
    <div class="text-center">
      <p>
      <BtcSign />{f.btc(1)} = {f.btc(100000000)}{SAT_SIGN}
      </p>
      <p class="text-sm text-gray-700 mb-3">
        one Bitcoin = one hundred million Satoshis
      </p>
    </div>
  );
}


export default class BitcoinStats extends Component {

  render() {

    return (
      <div>
      <div class="text-center">
        Theoretical total supply <BtcSign /> {f.btc(btcTCap)}
        <br/>
        Lost estimate <BtcSign /> {f.btc(btcLost)} ({btcLostPerc * 100}%)
        <br />
        Remaining supply <BtcSign /> {f.btc(btcRemainTSupply)}
      </div>

      <br />
      {verboseFiatPurchase()}

      <p class="text-center">
        Satoshis supply
        <br />
        {f.dec(btcRemainTSupply * 100000000)}
      </p>
      <p class="text-sm text-center text-gray-700 mb-3">
        {numberToWords(btcRemainTSupply * 100000000)} {SAT_SIGN}
      </p>
      </div>
    );
  }

}
