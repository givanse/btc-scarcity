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
        <Text id="bitcoin-stats.title">
          Bitcoin supply
        </Text>
      </h3>

      <table class="w-11/12 mx-auto table-fixed">
        <tr>
          <td class="text-right">
            <Text id="bitcoin-stats.total-supply">
              Total supply
            </Text>
          </td>
          <td>
            <i class="icon-bitcoin text-gray-600"></i>
            {f.whole(btcTCap)}
          </td>
        </tr>
        <tr>
          <td class="text-right">
            <Text id="bitcoin-stats.lost-estimate">
              Lost estimate
            </Text>
          </td>
          <td>
            <i class="icon-bitcoin text-gray-600"></i>
            {f.whole(btcLost)}
            &nbsp;({btcLostPerc * 100}%)<sup>§</sup>
          </td>
        </tr>
        <tr>
          <td class="text-right">
            <Text id="bitcoin-stats.remaining-supply">
              Remaining supply
            </Text>
          </td>
          <td>
            <i class="icon-bitcoin text-gray-600"></i>
            {f.whole(btcRemainTSupply)}
          </td>
        </tr>
      </table>

      </div>
    );
  }

}
