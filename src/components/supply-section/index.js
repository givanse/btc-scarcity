import {h, Component } from 'preact';
import style from './style';
import f from '../../utils/formatter';
import staticData from '../../utils/static-data';
import BitcoinStats from '../bitcoin-stats';
import Link from '../link';
import WealthPyramid from '../wealth-pyramid';
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
            <Text id="wealth-pyramid.title">
              Wealth Pyramid
            </Text>
          </h2>
        </a>
      </div>

      <WealthPyramid />

      <BitcoinStats />

      <div class={style['footnotes']}>
        <p class={style['foot-note']}>
          The vast majority of the 59.4 million millionaires in 2022 have wealth between USD 1 million and USD 5 million.
          <br />
          <a href="https://www.ubs.com/global/en/family-office-uhnw/reports/global-wealth-report-2023/_jcr_content/mainpar/toplevelgrid_5684475/col2/linklistnewlook/link_copy.0557094298.file/PS9jb250ZW50L2RhbS9hc3NldHMvd20vZ2xvYmFsL2ltZy9nbG9iYWwtZmFtaWx5LW9mZmljZS9kb2NzL2RhdGFib29rLWdsb2JhbC13ZWFsdGgtcmVwb3J0LTIwMjMtZW4tMi5wZGY=/databook-global-wealth-report-2023-en-2.pdf">
            Credit Suisse / UBS Group AG. (2023, August 22). Global Wealth Databook, Leading Perspectives To Navigate The Future. Retrieved March 10, 2024.
          </a>
        </p>
        <p class={style['foot-note']}>
          According to Chainalysis 3.79 million bitcoins are already gone for good based on a high estimate—and 2.78 million based on a low one. Those numbers imply 17% to 23% of existing bitcoins are lost.
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
