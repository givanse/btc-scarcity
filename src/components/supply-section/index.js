import {h, Component } from 'preact';
import style from './style';
import f from '../the-form/formatter';
import staticData from '../the-form/static-data';
import BtcSign from '../btc-sign';
import BitcoinStats from '../bitcoin-stats';
import LogBarChart from '../log-bar-chart';

const {
  UNITS,
  btcRemainTSupply,
  btcPerPerson,
  goldAboveGroundKg,
  goldPerPersonKg,
  broadMoneyPerCapita,
  moneySupply,
  usaMillionaireMedian,
  usaMillionaireMedianBroadPercentInBtc,
  netWorth1PercentMedian,
  netWorth1PercentMedianBroadMoneyPercentInBtc,
} = staticData;

const {
  TROY_OUNCE,
} = UNITS;

export default class TheFooter extends Component {

  render() {

    const {
      btcBought,
      fiatPurchase,
    } = this.props;

    return (
      <div>

      <h3>
        {'₿ ' + (btcBought >= 1 ? f.btc(btcBought) : f.sat(btcBought))}
        <br />
        supply percentage
      </h3>

      <LogBarChart fiatPurchase={fiatPurchase}
                   btcBought={btcBought} />

      <table class="w-11/12 text-center m-4 mt-8 mx-auto">
        <thead class="text-xl">
          <td></td>
          <td>
            <i class="icon-chart-pie"></i>
          </td>
          <td>
            1<i class="icon-person"></i>
          </td>
          <td>
           ₿
          </td>
        </thead>
        <tr>
          <td class="text-left">
            Mined Gold
          </td>
          <td>
            {f.dec(goldAboveGroundKg * TROY_OUNCE, 'billion')} oz <sup>†</sup>
          </td>
          <td>
            {(goldPerPersonKg * TROY_OUNCE).toFixed(3)} oz 
          </td>
          <td class="text-gray-500">
            {btcPerPerson.toFixed(8)}
          </td>
        </tr>

        <tr>
          <td class="text-left">
            Broad Money
          </td>
          <td>
            {f.usd(moneySupply.broadMoney, 'B')}<sup>*</sup>
          </td>
          <td>
            {f.usd(broadMoneyPerCapita)}
          </td>
          <td class="text-gray-500">
            {btcPerPerson.toFixed(8)}
          </td>
        </tr>

        <tr>
          <td class="text-left">
          </td>
          <td>
            Millionaire Median
          </td>
          <td>
            {f.usd(usaMillionaireMedian)}<sup>‡</sup>
          </td>
          <td>
          <BtcSign /> {f.btc(usaMillionaireMedianBroadPercentInBtc)}
          </td>
        </tr>

        <tr>
          <td class="text-left">
          </td>
          <td>
            The 1% Median
          </td>
          <td>
            {f.usd(netWorth1PercentMedian)}<sup>†</sup>
          </td>
          <td>
            <BtcSign /> {f.btc(netWorth1PercentMedianBroadMoneyPercentInBtc)}
          </td>
        </tr>

        <tr>
          <td class="text-left">
            Bitcoin
          </td>
          <td>
            <BtcSign /> {f.btc(btcRemainTSupply)}
          </td>
          <td>
            <BtcSign /> {btcPerPerson.toFixed(8)}
          </td>
          <td class="text-gray-500">
            {btcPerPerson.toFixed(8)}
          </td>
        </tr>
      </table>

      <h3 class="">
        Bitcoin Stats
      </h3>

      <BitcoinStats /> 

      </div>
    );
  }

}