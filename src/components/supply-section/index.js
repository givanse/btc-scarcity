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
            1<i class="icon-person"></i>
            <br />
            <span class="text-sm">
              <Text id="supply.qty-per-person">quantity per person</Text>
            </span>
          </td>
          <td>
            ₿
            <br />
            <span class="text-sm">
              <Text id="supply.bitcoin-equivalent">proportional bitcoin quantity</Text>
            </span>
          </td>
        </thead>

        <tr class="bg-gray-300 text-sm">
          <td colSpan="2">
            <Text id="supply.mined-gold">
              Mined Gold
            </Text>
            &nbsp;{f.dec(goldAboveGroundKg * TROY_OUNCE, 'B')} oz <sup>†</sup>
          </td>
        </tr>

        <tr>
          <td>
            {(goldPerPersonKg * TROY_OUNCE).toFixed(3)} oz 
          </td>
          <td class="">
            <a href={`?btc=${btcPerPerson.toFixed(8)}#bitcoin`} class="underline" data-navigate>
              <BtcSign/>{btcPerPerson.toFixed(8)}
            </a>
          </td>
        </tr>

        <tr class="bg-gray-300 text-sm">
          <td colSpan="2">
            <Text id="supply.broad-money">
              Broad Money
            </Text>
            &nbsp;{f.usd(moneySupply.broadMoney, 'B')}<sup>*</sup>
          </td>
        </tr>

        <tr>
          <td>
            {f.usd(broadMoneyPerCapita)}
          </td>
          <td class="">
            <a href={`?btc=${btcPerPerson.toFixed(8)}#bitcoin`} class="underline" data-navigate>
              <BtcSign/>{btcPerPerson.toFixed(8)}
            </a>
          </td>
        </tr>

        <tr class="bg-gray-300 text-sm">
          <td colSpan="2">
            <Text id="supply.millionaire-median">
              Millionaire Median
            </Text>
          </td>
        </tr>

        <tr>
          <td>
            {f.usd(usaMillionaireMedian)}<sup>‡</sup>
          </td>
          <td>
          <a href={`?btc=${usaMillionaireMedianBroadPercentInBtc.toFixed(8)}#bitcoin`} class="underline" data-navigate>
            <BtcSign />{usaMillionaireMedianBroadPercentInBtc.toFixed(8)}
          </a>
          </td>
        </tr>

        <tr class="bg-gray-300 text-sm">
          <td colSpan="2">
            <Text id="supply.percenter-median">
              The 1% Median
            </Text>
          </td>
        </tr>
        <tr>
          <td>
            {f.usd(netWorth1PercentMedian)}<sup>†</sup>
          </td>
          <td>
            <a href={`?btc=${netWorth1PercentMedianBroadMoneyPercentInBtc.toFixed(8)}#bitcoin`} class="underline" data-navigate>
              <BtcSign />{netWorth1PercentMedianBroadMoneyPercentInBtc.toFixed(8)}
            </a>
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
