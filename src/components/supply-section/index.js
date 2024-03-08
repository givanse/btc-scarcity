import {h, Component } from 'preact';
import style from './style';
import f from '../../utils/formatter';
import staticData from '../../utils/static-data';
import BitcoinStats from '../bitcoin-stats';
import Link from '../link';
import { Text } from 'preact-i18n';

const {
  btcPerPerson,
  usaMillionaireAverage,
  usaMillionaireAverageBroadPercentInBtc,
  netWorth1PercentMedian,
  netWorth1PercentMedianBroadMoneyPercentInBtc,
} = staticData;

export default class TheFooter extends Component {

  render() {

    const {
      btcBought,
      fiatPurchase,
      goldPrice,
    } = this.props;

    return (
      <div>

      <div id="supply" class="block pt-4">
        <a href="#supply" class="cursor-pointer">
          <h2 class="bg-purple-700 text-white ">
            <Text id="supply.title">Supply</Text>
          </h2>
        </a>
      </div>


      <table class={style['supply']} >
        <tr>
          <td class="text-center" colspan="2">
            <i class="icon-person text-4xl"></i>
          </td>
        </tr>

        <tr class="bg-gray-800 text-sm">
          <td colspan="2">
            <Text id="supply.millionaire-average">
              Average Millionaire
            </Text>
          </td>
        </tr>

        <tr>
          <td class="text-right">
            {f.usd(usaMillionaireAverage)}<sup>‡</sup>
          </td>
          <td class="text-left">
            <Link queryParams={`btc=${usaMillionaireAverageBroadPercentInBtc.toFixed(8)}`}
                  hash='bitcoin'>
              <i class="icon-bitcoin"></i>
              {usaMillionaireAverageBroadPercentInBtc.toFixed(8)}
            </Link>
          </td>
        </tr>

        <tr class="bg-gray-800 text-sm">
          <td colspan="2">
            <Text id="supply.percenter-median">
              The 1% Median
            </Text>
          </td>
        </tr>
        <tr>
          <td class="text-right">
            {f.usd(netWorth1PercentMedian)}<sup>¶</sup>
          </td>
          <td class="text-left">
            <Link queryParams={`btc=${netWorth1PercentMedianBroadMoneyPercentInBtc.toFixed(8)}`}
                  hash='bitcoin'>
              <i class="icon-bitcoin"></i>
              {netWorth1PercentMedianBroadMoneyPercentInBtc.toFixed(8)}
            </Link>
          </td>
        </tr>

      </table>

      <BitcoinStats /> 

      <div class={style['footnotes']}>
        <p class={style['foot-note']}>
          * The best estimates currently available suggest that around 190,040 tonnes of gold has been mined throughout history.
          <br />
          <a href="https://www.gold.org/about-gold/gold-supply/gold-mining/how-much-gold">
            How much gold has been mined? (2017, December 14). Retrieved October 30, 2019.
          </a>
        </p>
        <p class={style['foot-note']}>
          ‡ The Fed's most recent survey shows that the top 10% of Americans have a median and average net worth (assets minus liabilities) of $1.87 million and $4.03 million, respectively.
          <br />
          <a href="https://www.fool.com/investing/general/2016/01/24/how-does-your-net-worth-compare-to-the-average-ame.aspx">
            Campbell, T. (2018, March 7). How Does Your Net Worth Compare to the Average American Millionaire? Retrieved October 31, 2019.
          </a>
        </p>
        <p class={style['foot-note']}>
          ¶ The median net worth for the top 1% is $10.7 million.
          <br />
          <a href="https://www.financialsamurai.com/top-one-percent-net-worth-amounts-by-age/">
            Sammuray, F. The Top 1% Net Worth Amounts By Age. Retrieved October 31, 2019.
          </a>
        </p>
        <p class={style['foot-note']}>
          § According to Chainalysis 3.79 million bitcoins are already gone for good based on a high estimate—and 2.78 million based on a low one. Those numbers imply 17% to 23% of existing bitcoins are lost.
          <br />
          <a href="https://fortune.com/2017/11/25/lost-bitcoins/">
            Roberts, J. J., & Rapp, N. (2017, November 26). Nearly 4 Million Bitcoins Lost Forever, New Study Says. Retrieved December 27, 2019.
          </a>
        </p>
      </div>

      </div>
    );
  }

}
