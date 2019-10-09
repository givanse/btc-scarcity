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
	goldPerPersonKgPercentage,
	goldPerPersonKg,
	carsPerPerson,
	landPerPerson,
	earthLandSurface,
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
			<div>
			<form onSubmit={e => e.preventDefault()}>
				<label for="btc-hodl">
					BTC HODL
				</label>
				<br />
				₿<input name="btc-hodl"
				        value={f.sat(btcHodl)}
		            onChange={e => this.updateBtcHodl(e)} />
				<br />
				{f.dec(btcHodlInIndividualShares(btcHodl))} individual BTC shares
				<br />
				or {f.dec(btcHodlInIndividualShares(btcHodl) * goldPerPersonKg)} kg of gold
				<br />
				or {f.dec(btcHodlInIndividualShares(btcHodl) * carsPerPerson)} cars
				<br />
				or {f.dec(btcHodlInIndividualShares(btcHodl) * landPerPerson)} km<sup>2</sup> of land
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
				<br />
				broad money per capita {f.per((broadMoneyPerCapita * 100) / moneySupply.broadMoney)}
				<br/>
				the same percent per capita in BTC is ₿{f.sat((btcRemainTSupply * (broadMoneyPerCapita * 100) / moneySupply.broadMoney) / 100)}
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
				gold per capita {(goldPerPersonKg).toFixed(3)} kg
				&nbsp;or {(goldPerPersonKg * KILO).toFixed(3)} gr
				&nbsp;or {(goldPerPersonKg * TROY_OUNCE).toFixed(3)} troy ounce
				<br />
				gold per capita {f.per(goldPerPersonKgPercentage)}				 
				<br/>
				the same percent per capita in BTC is ₿{f.sat((btcRemainTSupply * goldPerPersonKgPercentage) / 100)}
			</div>

			<br/>

			<div>
				<h2>Land</h2>
				earth's surface {f.dec(earthLandSurface)} km<sup>2</sup> (excluding water)
				<br/>
				land per person {f.dec(landPerPerson)} km<sup>2</sup>
				<br/>
				or {f.dec(landPerPerson * 1000000)} m<sup>2</sup> 
				<br/>
				or {f.dec(landPerPerson * ACRE)} acres
				<br/>
				or {f.dec(landPerPerson * SQUARE_FEET)} sqft
			</div>
			<div>
				<h2>Cars</h2>
				cars in the world {f.dec(cars)}
				<br />
				cars per capita {f.dec(carsPerPerson)}
				<br />
				1 car would be owned by {f.dec(personsPerCar)} people
				<br />
				{f.dec(personsPerCar)} individuals's BTC share would be ₿{f.sat(btcPerPerson * personsPerCar)}
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
