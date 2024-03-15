import {h, Component } from 'preact';
import style from './style';
import staticData from '../../utils/static-data';
import f from '../../utils/formatter';
import { Text } from 'preact-i18n';

const SAT_SIGN = ' sat';

const {
  btcTCap,
  btcLost,
  btcRemainTSupply,
} = staticData;

export default class BitcoinStats extends Component {

  render() {

    return (
      <div>

      <table class="w-11/12 mt-16 mx-auto table-fixed text-gray-600">
        <tr>
          <td class="text-right">
            <Text id="bitcoin-stats.total-supply">
              Total supply
            </Text>
          </td>
          <td>
            <i class="icon-bitcoin text-gray-700"></i>
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
            <i class="icon-bitcoin text-gray-700"></i>
            {f.whole(btcLost)}
          </td>
        </tr>
        <tr>
          <td class="text-right">
            <Text id="bitcoin-stats.remaining-supply">
              Remaining supply
            </Text>
          </td>
          <td>
            <i class="icon-bitcoin text-gray-700"></i>
            {f.whole(btcRemainTSupply)}
          </td>
        </tr>
        <tr>
          <td class="text-right">
            <Text id="bitcoin-stats.total-adults">
              Adults
            </Text>
          </td>
          <td>
            <i class="icon-person text-gray-700"></i>
            {f.dec(staticData.totalAdultPopulation, f.PRECISION.BILLION.name)}
          </td>
        </tr>
        <tr>
          <td class="text-right">
            <Text id="bitcoin-stats.total-wealth">
              Total wealth
            </Text>
          </td>
          <td>
            <i class="icon-dollar text-gray-700"></i>
            {f.dec(staticData.totalGlobalIndividualWealth, f.PRECISION.TRILLION.name)}
          </td>
        </tr>
      </table>

      </div>
    );
  }

}
