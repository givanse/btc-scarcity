import { h, Component } from 'preact';
import style from './style';
import { tsImportEqualsDeclaration } from '@babel/types';

const KILO = 1000;
const MILLION = 1000000;
const USA_BILLION = MILLION * 1000;
const USA_TRILLION = USA_BILLION * 1000;

const TROY_OUNCE = 32.150747; // 1 kg
const ACRE = 247.10538; // 1 km^2
const SQUARE_FEET = 10763910; // 1 km^2

const f = {
	_usd: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}),
	usd: function(number) {
	  return this._usd.format(number);
  },
	_btc: new Intl.NumberFormat('en-US', {style: 'decimal'}),
	btc: function(number) {
		return this._btc.format(number);
	},
	_dec: new Intl.NumberFormat('en-US', {style: 'decimal', minimumSignificantDigits: 2}),
	dec: function(number) {
		return this._dec.format(number);
	},
	_sat: new Intl.NumberFormat('en-US', {style: 'decimal', minimumFractionDigits: 8}),
	sat: function(number) {
		return this._sat.format(number);
	},
	_per: new Intl.NumberFormat('en-US', {
		style: 'percent',
		//minimumFractionDigits: 8, maximumFractionDigits: 8,
		//minimumSignificantDigits: 2,
		maximumSignificantDigits: 3}),
	per: function(number) {
		// times 100 because I rather do the rule of thirds myself
		return this._per.format(number / 100);
	}
};

export default class TheForm extends Component {

	state = {
		btcHodl: 0.00000001,
		btcTCap: 21000000,
		// 20% 
		btcLostPerc: 0.2,
	};

	render() {
		const btcHodl = this.state.btcHodl;
		const btcTCap = this.state.btcTCap;
		let btcLost = this.state.btcTCap * this.state.btcLostPerc;
		const btcRemainTSupply = this.state.btcTCap - btcLost;
		const worldPopulation = 7.7 * USA_BILLION;
		const btcPerPerson = btcRemainTSupply / worldPopulation;
		const btcHodlInIndividualShares = btcHodl / btcPerPerson;

		const btcHodlPercOfRemainTSupply = (this.state.btcHodl * 100) / btcRemainTSupply;

		// https://www.universetoday.com/25756/surface-area-of-the-earth/
		// inludes inhabitable land
		const earthLandSurface = 149 * MILLION; // km^2
		const landPerPerson = earthLandSurface / worldPopulation;

		// https://en.wikipedia.org/wiki/Gold#cite_note-7
		// https://www.gold.org/about-gold/gold-supply
		const goldAboveGround = 186700 /* tons */ * KILO; // kg
		const goldPerPersonKg = goldAboveGround / worldPopulation;
		const goldPerPersonKgPercentage = (goldPerPersonKg * 100) / goldAboveGround; 

		// https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/
		const moneySupply = {
			narrowMoney: 36.8 * USA_TRILLION,
			broadMoney: 90.4 * USA_TRILLION,
		};
		const coinsAndBankNotes = moneySupply.narrowMoney * USA_TRILLION;
		const coinsAndBankNotesPerPerson = coinsAndBankNotes / worldPopulation;
		const broadMoneyPerCapita = moneySupply.broadMoney / worldPopulation;

		// https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza
		const gizaPyramidMass = 5.9 * MILLION * 1000; // kg
		const gizaPyramidPerPerson = gizaPyramidMass / worldPopulation;

		// https://www.carsguide.com.au/car-advice/how-many-cars-are-there-in-the-world-70629
		const cars = 1.4 * USA_BILLION;
		const carsPerPerson = cars / worldPopulation;
		const personsPerCar = 1 / carsPerPerson;

		const usaMillionaireMedian = 1.87 * MILLION;
		const usaMillionaireMedianNarrowPercent = (usaMillionaireMedian * 100) / moneySupply.narrowMoney;
		const usaMillionaireMedianNarrowPercentInBtc = usaMillionaireMedianNarrowPercent * btcRemainTSupply;
		const usaMillionaireMedianBroadPercent = (usaMillionaireMedian * 100) / moneySupply.broadMoney;
		const usaMillionaireMedianBroadPercentInBtc = (usaMillionaireMedianBroadPercent * btcRemainTSupply) / 100;

    return (
			<div>
			<form onSubmit={e => e.preventDefault()}>
				<label for="btc-hodl">
					BTC HODL
				</label>
				<br />
				₿<input name="btc-hodl" value={f.sat(btcHodl)}
		            onChange={e => this.updateBtcHodl(e)} />
				<br />
				{f.dec(btcHodlInIndividualShares)} individual BTC shares
				<br />
				or {f.dec(btcHodlInIndividualShares * goldPerPersonKg)} kg of gold
				<br />
				or {f.dec(btcHodlInIndividualShares * carsPerPerson)} cars
				<br />
				or {f.dec(btcHodlInIndividualShares * landPerPerson)} km<sup>2</sup> of land
				<br />
				or {f.usd(btcHodlInIndividualShares * broadMoneyPerCapita)} broad money
			</form>

			<div>
				<h2>BTC stats</h2>
				Total theoretical supply ₿{btcTCap}
				<br/>
				Lost estimate ₿{f.btc(btcLost)} ({this.state.btcLostPerc * 100}%)
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
