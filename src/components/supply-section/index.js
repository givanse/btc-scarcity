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
  btcPerPerson,
  goldAboveGroundOz,
  goldPerPersonOz,
  broadMoneyPerCapita,
  moneySupply,
  usaMillionaireMedian,
  usaMillionaireMedianBroadPercentInBtc,
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

      <h4>
        <Text id="supply.supply-percentage">
          supply percentage
        </Text>
      </h4>

      <LogBarChart fiatPurchase={fiatPurchase}
                   goldPrice={goldPrice}
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
            &nbsp;{f.dec(goldAboveGroundOz, 'B')} oz <sup>*</sup>
          </td>
        </tr>

        <tr>
          <td>
            {(goldPerPersonOz).toFixed(3)} oz 
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
            &nbsp;{f.usd(moneySupply.broadMoney, 'B')}<sup>†</sup>
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
            {f.usd(netWorth1PercentMedian)}<sup>¶</sup>
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

      <hr class="my-24 mx-8" />

      <div class={style['footnotes']}>
        <p class={style['foot-note']}>
          * The best estimates currently available suggest that around 190,040 tonnes of gold has been mined throughout history.
          <br />
          <a href="https://www.gold.org/about-gold/gold-supply/gold-mining/how-much-gold">
            How much gold has been mined? (2017, December 14). Retrieved October 30, 2019.
          </a>
        </p>
        <p class={style['foot-note']}> 
          † Broad money is the total value of the world's money. This includes coins, banknotes, money market accounts, as well as saving, checking, and time deposits.
          <br />
          <a href="https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/">
            Desjardins, J. (2017, October 26). All of the World's Money and Markets in One Visualization. Retrieved October 30, 2019.
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
