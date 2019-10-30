import { h, Component } from 'preact';
import style from './style';
import f from './formatter';
import staticData from './static-data';

const {
  UNITS,
  btcTCap,
	btcLostPerc,
	btcLost,
  btcRemainTSupply,
  worldPopulation,
	btcPerPerson,
	btcHodlInIndividualShares,
	btcHodlPercOfRemainTSupply,
	goldAboveGround,
	goldPerPersonKg,
	broadMoneyPerCapita,
	moneySupply,
	usaMillionaireMedian,
  usaMillionaireMedianNarrowPercent,
  usaMillionaireMedianNarrowPercentInBtc,
  usaMillionaireMedianBroadPercent,
	usaMillionaireMedianBroadPercentInBtc,
	cars,
	personsPerCar,
} = staticData;

const {
  KILO,
  MILLION,
  USA_BILLION,
  USA_TRILLION,
  TROY_OUNCE,
  ACRE,
  SQUARE_FEET,
} = UNITS;

export default class TheForm extends Component {

	state = {
		btcHodl: 0.00000001,
	};

	render() {
		const btcHodl = this.state.btcHodl;
		//const btcHodlPercOfRemainTSupply = btcHodlPercOfRemainTSupply(btcHodl);

    return (
			<div class="">
			<form onSubmit={e => e.preventDefault()}>
				<br />
				₿<input name="btc-hodl"
				        class="w-11/12 border-blue-500 rounded-full py-2 px-4"
								value={f.sat(btcHodl)}
								placeholder="bitcoin amount"
		            onChange={e => this.updateBtcHodl(e)} />
				<label for="btc-hodl">
					Bitcoin amount
				</label>
				<br />
				{f.dec(btcHodlInIndividualShares(btcHodl))} people
				<br />
				or {f.dec(btcHodlInIndividualShares(btcHodl) * goldPerPersonKg)} kg of gold
			</form>

			<div>
				<h2>BTC stats</h2>
				Total theoretical supply ₿{f.btc(btcTCap)}
				<br/>
				Lost estimate ₿{f.btc(btcLost)} ({btcLostPerc * 100}%)
				<br />
				Remaining supply ₿{f.btc(btcRemainTSupply)}
				<br />
				BTC per person ₿{btcPerPerson.toFixed(8)}
			</div>

			<div>
				<h2>Money supply</h2>
				broad money: {f.usd(moneySupply.broadMoney)}
				<br />
				broad money per capita {f.usd(broadMoneyPerCapita)}
			</div>

			<div>
				<h2>Millionaire net worth</h2>
				millionaire median net worth {f.usd(usaMillionaireMedian)}
				<br />
				equal to {f.per(usaMillionaireMedianBroadPercent)} of the broad money supply
				<br />
				the same percentage of wealth in BTC is 
				₿{f.btc(usaMillionaireMedianBroadPercentInBtc)}
			</div>	

		  <div>
				<h2>Gold</h2>
				world population {f.dec(worldPopulation)}
				<br />
				gold above ground {f.dec(goldAboveGround)} kg
				<br/>
				gold per capita 
				<br/>
				{(goldPerPersonKg).toFixed(3)} kg
				&nbsp;or {(goldPerPersonKg * KILO).toFixed(3)} gr
				&nbsp;or {(goldPerPersonKg * TROY_OUNCE).toFixed(3)} troy ounce
			</div>
			</div>
		);
	}

	updateBtcHodl(e) {
		const input = e.target;
		const state = Object.assign({}, this.state);
		state.btcHodl = input.value;
		this.setState(state);
	}

}
