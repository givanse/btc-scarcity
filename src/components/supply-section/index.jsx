/** @jsx h */
import {h, Component } from 'preact';
import style from './style.module.css';
import f from '../../utils/formatter';
import staticData from '../../utils/static-data';
import BitcoinStats from '../bitcoin-stats';
import Link from '../link';
import WealthPyramid from '../wealth-pyramid';
import { Text } from 'preact-i18n';

const {
  btcPerPerson,
  mMillionaire,
  mMillionaireBroadPercentInBtc,
  pointOnePercenter,
  pointOnePercenterWealthPercentInBtc,
} = staticData;

export default class SupplySection extends Component {

  render() {

    const {
      btcBought,
      fiatPurchase,
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
          As of end-2025, about 57.5–58 million adults in the UBS sample are US-dollar millionaires (1.5%), and the vast majority own between USD 1 million and USD 5 million. Figures cover 56 markets representing over 92% of world wealth.
          <br />
          <a href="https://www.ubs.com/content/dam/assets/wm/static/gwr/global-wealth-report-en-2026.pdf">
            UBS Group AG. (2026). Global Wealth Report 2026. Retrieved August 2, 2026.
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
