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
  goldAboveGround,
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

      <h3>Broad Money</h3>
      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <div>
          money
        </div>
        <div></div>
        <div>
          bitcoin
        </div>

        <div>
          {f.usd(moneySupply.broadMoney, 'billion')}<sup>*</sup>
        </div>
        <div>supply</div>
        <div>
          <BtcSign /> {f.btc(btcRemainTSupply)}
        </div>

        <div>
          {f.usd(broadMoneyPerCapita)}
        </div>
        <div>
          1<i class="icon-person"></i>
        </div>
        <div>
          <BtcSign /> {btcPerPerson.toFixed(8)}
        </div>
      </div>

      <h3>Mined Gold</h3>
      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <div>
          gold
        </div>
        <div></div>
        <div>
          bitcoin
        </div>

        <div>
          {f.dec(goldAboveGround * TROY_OUNCE, 'billion')} oz <sup>†</sup>
        </div>
        <div>supply</div>
        <div>
          <BtcSign /> {f.btc(btcRemainTSupply)}
        </div>

        <div>
          {(goldPerPersonKg * TROY_OUNCE).toFixed(3)} oz 
        </div>
        <div>
          1<i class="icon-person"></i>
        </div>
        <div>
          <BtcSign /> {btcPerPerson.toFixed(8)}
        </div>
      </div>

      <h3>Millionaire Median</h3>
      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <div>
          money
        </div>
        <div></div>
        <div>
          bitcoin
        </div>

        <div>
          {f.usd(moneySupply.broadMoney, 'billion')}
        </div>
        <div>supply</div>
        <div>
          <BtcSign /> {f.btc(btcRemainTSupply)}
        </div>

        <div>
          {f.usd(usaMillionaireMedian)}<sup>‡</sup>
        </div>
        <div>
          1<i class="icon-person"></i>
        </div>
        <div>
          <BtcSign /> {f.btc(usaMillionaireMedianBroadPercentInBtc)}
        </div>
      </div>  

      <h3>The 1% Median</h3>
      <div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <div>
          money
        </div>
        <div></div>
        <div>
          bitcoin
        </div>

        <div>
          {f.usd(moneySupply.broadMoney, 'billion')}
        </div>
        <div>supply</div>
        <div>
          <BtcSign /> {f.btc(btcRemainTSupply)}
        </div>

        <div>
          {f.usd(netWorth1PercentMedian)}<sup>†</sup>
        </div>
        <div>
          1<i class="icon-person"></i>
        </div>
        <div>
          <BtcSign /> {f.btc(netWorth1PercentMedianBroadMoneyPercentInBtc)}
        </div>
      </div>

      <h3 class="">
        Bitcoin
        <br />
        <i class="icon-chart-pie"></i>
      </h3>

      <BitcoinStats /> 

      </div>
    );
  }

}
