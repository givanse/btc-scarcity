import {h, Component } from 'preact';
import style from './style';
import f from '../../utils/formatter';
import staticData from '../../utils/static-data';
import BtcSign from '../btc-sign';
import BitcoinStats from '../bitcoin-stats';
import LogBarChart from '../log-bar-chart';
import Link from '../link';
import { Text } from 'preact-i18n';

const {
  UNITS,
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

      <h4>
        <Text id="supply.supply-percentage">
          supply percentage
        </Text>
      </h4>

      <LogBarChart fiatPurchase={fiatPurchase}
                   btcBought={btcBought} />

      <table class={style['supply']} >
        <thead class="text-xl">
          <td>
            1<i class="icon-person"></i>
            <br />
            <span class="text-sm">
              <Text id="qty-per-person">quantity per person</Text>
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
            <Text id="mined-gold">
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
            <Link queryParams={`btc=${btcPerPerson.toFixed(8)}`}
                  hash='bitcoin'>
              <BtcSign/>{btcPerPerson.toFixed(8)}
            </Link>
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
            <Link queryParams={`btc=${btcPerPerson.toFixed(8)}`}
                  hash='bitcoin'>
              <BtcSign/>{btcPerPerson.toFixed(8)}
            </Link>
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
            <Link queryParams={`btc=${usaMillionaireMedianBroadPercentInBtc.toFixed(8)}`}
                  hash='bitcoin'>
              <BtcSign />{usaMillionaireMedianBroadPercentInBtc.toFixed(8)}
            </Link>
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
            <Link queryParams={`btc=${netWorth1PercentMedianBroadMoneyPercentInBtc.toFixed(8)}`}
                  hash='bitcoin'>
              <BtcSign />{netWorth1PercentMedianBroadMoneyPercentInBtc.toFixed(8)}
            </Link>
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
