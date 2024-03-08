import {h, Component } from 'preact';
import style from './style';
import BtcSign from '../btc-sign';
import staticData from '../../utils/static-data';
import f from '../../utils/formatter';
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

      <h3 class="">
        <Text id="supply.bitcoin-stats">
          Bitcoin Stats
        </Text>
      </h3>

      <div class="text-center w-11/12 mx-auto">
        <p class="bg-gray-300 py-3">
          <Text id="bitcoin-stats.total-supply">
            Theoretical total supply
          </Text>
        </p>

        <i class="icon-bitcoin text-gray-600"></i>
        {f.whole(btcTCap)}

        <p class="bg-gray-300 py-3">
          <Text id="bitcoin-stats.lost-estimate">
            Lost estimate
          </Text>
        </p>

        <i class="icon-bitcoin text-gray-600"></i>
        {f.whole(btcLost)}
        &nbsp;({btcLostPerc * 100}%<sup>§</sup>)

        <p class="bg-gray-300 py-3">
          <Text id="bitcoin-stats.remaining-supply">
            Remaining supply
          </Text>
        </p>

        <i class="icon-bitcoin text-gray-600"></i>
        {f.whole(btcRemainTSupply)}

      </div>

      </div>
    );
  }

}
