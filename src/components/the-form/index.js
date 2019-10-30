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
		btcHodl: 0.00000000,
	};

	render() {
		const btcHodl = this.state.btcHodl;
		//const btcHodlPercOfRemainTSupply = btcHodlPercOfRemainTSupply(btcHodl);

    return (
		  <div>
			<form class="text-center"
			      onSubmit={e => e.preventDefault()}>
				₿<input name="btc-hodl"
								class="text-center text-2xl w-1/2 py-2 px-4 m-4 bg-blue-100 focus:bg-white"
								placeholder="type in a bitcoin amount"
								onChange={e => this.updateBtcHodl(e)} />
			</form>

			<div class="col-50-50 text-center">
				<div>
					₿ {f.sat(btcPerPerson)}
					<br />
					BTC per person
				</div>
				<div>
					₿ {f.sat(btcHodl)}
					<br />
					your Bitcoin 
				</div>

				<div>
					1
					<br />
					person
				</div>
				<div>
					{f.dec(btcHodlInIndividualShares(btcHodl))}
					<br />
					people
				</div>


				<div>
					{f.dec(goldPerPersonKg * TROY_OUNCE)} oz
					<br />
					gold
				</div>
				<div>
					{f.dec(btcHodlInIndividualShares(btcHodl) * goldPerPersonKg * TROY_OUNCE)} oz
					<br />
					gold
				</div>

				<div>
				  {f.dec(btcPerPerson / usaMillionaireMedianBroadPercentInBtc)}
					<br />
					median millionaires
				</div>
				<div>
				  {f.dec(btcHodl / usaMillionaireMedianBroadPercentInBtc)}
					<br />
					median millionaires
				</div>
			</div>

			<div class="text-center m-2">
				BTC price {f.usd(9500)}
			</div>
			<div class="col-50-50 text-center">
				<div>
					{f.usd(btcPerPerson * 9500)}
					<br />
					cost to own somebody's BTC share
				</div>
				<div>
					{f.usd(btcHodl* 9500)}
					<br />
					amount value
				</div>
			</div>

			<h2>Everyone</h2>
			<div class="text-center">
			  world population {f.dec(worldPopulation)}
			</div>
			<div class="col-33-33-33 text-center">
				<div>
					{f.usd(moneySupply.broadMoney)}
				  <br/>
					Broad money supply
				</div>
				<div>
					₿ {f.btc(btcRemainTSupply)}
				  <br/>
				  BTC supply
				</div>
        <div>
				  {f.dec(goldAboveGround)} kg
				  <br/>
				  gold above ground
        </div>

				<div>
					{f.usd(broadMoneyPerCapita)}
					<br />
					Broad money per capita
				</div>
				<div>
					₿ {btcPerPerson.toFixed(8)}
					<br />
				  BTC per capita
				</div>
        <div>
					{(goldPerPersonKg).toFixed(3)} kg
					&nbsp;or {(goldPerPersonKg * TROY_OUNCE).toFixed(3)} troy oz 
					<br/>
					gold per capita 
        </div>
			</div>

		  <h2>Millionaire</h2>
			<div class="col-50-50 text-center">
		    <div>
					{f.usd(moneySupply.broadMoney)}
				  <br/>
					Broad money supply
		    </div>
		    <div>
					₿ {f.btc(btcRemainTSupply)}
				  <br/>
				  BTC supply
		    </div>

		    <div>
					{f.per(usaMillionaireMedianBroadPercent)}
					<br />
					millionaire median net worth as a percentage of broad money
		    </div>
		    <div>
					{f.per(usaMillionaireMedianBroadPercent)}
					<br />
					same percentage
		    </div>

		    <div>
					{f.usd(usaMillionaireMedian)}
					<br />
					millionaire median net worth
		    </div>
		    <div>
				  ₿ {f.btc(usaMillionaireMedianBroadPercentInBtc)}
					<br />
				  same level of wealth in BTC
		    </div>
			</div>	

 		  <h2>BTC Stats</h2>
			<div class="text-center">
				Total theoretical supply ₿ {f.btc(btcTCap)}
				<br/>
				Lost estimate ₿ {f.btc(btcLost)} ({btcLostPerc * 100}%)
				<br />
				Remaining supply ₿ {f.btc(btcRemainTSupply)}
				<br />
				BTC per person ₿ {btcPerPerson.toFixed(8)}
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
