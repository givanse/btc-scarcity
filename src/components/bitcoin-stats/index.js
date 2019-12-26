import {h, Component } from 'preact';
import style from './style';
import BtcSign from '../btc-sign';
import staticData from '../../utils/static-data';
import f from '../the-form/formatter';
import {
  numberToWords,
} from '../the-form/words';
import { Text } from 'preact-i18n';

const SAT_SIGN = ' sat';

const {
  btcTCap,
  btcLostPerc,
  btcLost,
  btcRemainTSupply,
} = staticData;

export default class BitcoinStats extends Component {

  render() {

    return (
      <div>
      <div class="text-center">
        <Text id="bitcoin-stats.total-supply">
          Theoretical total supply
        </Text>
        <br />
        <BtcSign /> {f.whole(btcTCap)}
        <br/>
        <Text id="bitcoin-stats.lost-estimate">
          Lost estimate
        </Text>
        <br />
        <BtcSign /> {f.whole(btcLost)} ({btcLostPerc * 100}%)
        <br />
        <Text id="bitcoin-stats.remaining-supply">
          Remaining supply
        </Text>
        <br />
        <BtcSign /> {f.btc(btcRemainTSupply)}
      </div>

      <p class="text-center">
        <Text id="bitcoin-stats.sats-supply">
          Satoshis supply
        </Text>
        <br />
        {f.dec(btcRemainTSupply * 100000000)} {SAT_SIGN}
      </p>
      <p class="text-sm text-center text-gray-700 mb-3">
        {numberToWords(btcRemainTSupply * 100000000)} Satoshis
      </p>

      <br />
      <div class="text-center">
        <p>
        <BtcSign />1 = 
        <a href={`?btc=${1}#bitcoin`} class="underline" data-navigate>
          &nbsp;{f.btc(100000000)} {SAT_SIGN}
        </a>
        </p>
        <p class="text-sm text-gray-700 mb-3">
          <Text id="bitcoin-stats.one-bitcoin">one Bitcoin</Text> = <Text id="bitcoin-stats.100M-sats">one hundred million Satoshis</Text>
        </p>
      </div>
      </div>
    );
  }

}
