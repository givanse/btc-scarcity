import {h, Component } from 'preact';
import style from './style';
import f from '../the-form/formatter';
import staticData from '../the-form/static-data';
import BtcSign from '../btc-sign';
import BitcoinStats from '../bitcoin-stats';
import LogBarChart from '../log-bar-chart';
import { Text } from 'preact-i18n';

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
        <Text id="supply.supply-percentage">
          supply percentage
        </Text>
      </h3>

      <LogBarChart fiatPurchase={fiatPurchase}
                   btcBought={btcBought} />

      <table class={style['supply']} >
        <thead class="text-xl">
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
          <td>
            <Text id="supply.mined-gold">
              Mined Gold
            </Text>
            <br/>
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
          <td>
            <Text id="supply.broad-money">
              Broad Money
            </Text>
            <br/>
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
          <td>
            <Text id="supply.millionaire-median">
              Millionaire Median
            </Text>
          </td>
          <td>
            {f.usd(usaMillionaireMedian)}<sup>‡</sup>
          </td>
          <td>
          <a href={`?btc=${usaMillionaireMedianBroadPercentInBtc.toFixed(8)}#bitcoin`} class="underline" data-navigate>
            <BtcSign /> {f.btc(usaMillionaireMedianBroadPercentInBtc)}
          </a>
          </td>
        </tr>

        <tr>
          <td>
            <Text id="supply.percenter-median">
              The 1% Median
            </Text>
          </td>
          <td>
            {f.usd(netWorth1PercentMedian)}<sup>†</sup>
          </td>
          <td>
            <a href={`?btc=${netWorth1PercentMedianBroadMoneyPercentInBtc.toFixed(8)}#bitcoin`} class="underline" data-navigate>
              <BtcSign /> {f.btc(netWorth1PercentMedianBroadMoneyPercentInBtc)}
            </a>
          </td>
        </tr>

        <tr>
          <td>
            Bitcoin
            <br/>
            {f.btc(btcRemainTSupply)}
          </td>
          <td>
            <a href={`?btc=${btcPerPerson.toFixed(8)}#bitcoin`} class="underline" data-navigate>
              <BtcSign /> {btcPerPerson.toFixed(8)}
            </a>
          </td>
          <td class="text-gray-500">
            {btcPerPerson.toFixed(8)}
          </td>
        </tr>
      </table>

      <h3 class="">
        <Text id="supply.bitcoin-stats">
          Bitcoin Stats
        </Text>
      </h3>

      <BitcoinStats /> 

      </div>
    );
  }

}
