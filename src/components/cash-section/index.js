import {h, Component } from 'preact';
import style from './style';
import BtcSign from '../btc-sign';
import f from '../../utils/formatter';
import staticData from '../../utils/static-data';
import { Text } from 'preact-i18n';

const {
  btcPerPerson,
  btcHodlInIndividualShares,
} = staticData;

export default class TheFooter extends Component {

  render() {

    const { btcBought } = this.props;

    return (
      <div>
      <div id="cash" class="block pt-4">
        <a href="#cash" class="cursor-pointer">
          <h2 class="background-money text-white">
            <Text id="cash.title">Cash</Text>
          </h2>
        </a>
      </div>

      {this.props.children}

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
      </div>
    );
  }

}
