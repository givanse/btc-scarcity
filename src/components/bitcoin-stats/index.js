import {h, Component } from 'preact';
import style from './style';
import BtcSign from '../btc-sign';
import staticData from '../../utils/static-data';
import f from '../../utils/formatter';
import Link from '../link';
import {
  numberToWords,
} from '../../utils/words';
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
      <div class="text-center w-11/12 mx-auto">
        <p class="bg-gray-300 py-3">
          <Text id="bitcoin-stats.total-supply">
            Theoretical total supply
          </Text>
        </p>

        <BtcSign /> {f.whole(btcTCap)}

        <p class="bg-gray-300 py-3">
          <Text id="bitcoin-stats.lost-estimate">
            Lost estimate
          </Text>
        </p>

        <BtcSign /> {f.whole(btcLost)} ({btcLostPerc * 100}%<sup>§</sup>)

        <p class="bg-gray-300 py-3">
          <Text id="bitcoin-stats.remaining-supply">
            Remaining supply
          </Text>
        </p>

        <BtcSign /> {f.btc(btcRemainTSupply)}

        <p class="text-center bg-gray-300 py-3">
          <Text id="bitcoin-stats.sats-supply">
            Satoshis supply
          </Text>
        </p>
        {f.dec(btcRemainTSupply * 100000000)} {SAT_SIGN}
        <p class="text-sm text-center text-gray-700 mb-3">
          {numberToWords(btcRemainTSupply * 100000000)} Satoshis
        </p>
      </div>

      <br />
      <div class="text-center">
        <p>
          <BtcSign />1 = 
          <Link queryParams={`btc=${1}`} hash='bitcoin'>
            &nbsp;{f.whole(100000000)} {SAT_SIGN}
          </Link>
        </p>
        <p class="text-sm text-gray-700 mb-3">
          <Text id="bitcoin-stats.one-bitcoin">one Bitcoin</Text> = <Text id="bitcoin-stats.100M-sats">one hundred million Satoshis</Text>
        </p>
      </div>
      </div>
    );
  }

}
