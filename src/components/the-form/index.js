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
	_dec: new Intl.NumberFormat('en-US', {style: 'decimal', maximumSignificantDigits: 2}),
	dec: function(number) {
		return this._dec.format(number);
	},
	_sat: new Intl.NumberFormat('en-US', {style: 'decimal', maximumFractionDigits: 8}),
	sat: function(number) {
		return this._sat.format(number);
	},
	_per: new Intl.NumberFormat('en-US', {
		style: 'percent', minimumFractionDigits: 8, maximumFractionDigits: 8}),
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
		const btcHodl = f.sat(this.state.btcHodl);
		const btcTCap = this.state.btcTCap;
		let btcLost = this.state.btcTCap * this.state.btcLostPerc;
		const btcRemainTSupply = this.state.btcTCap - btcLost;
		const worldPopulation = 7.7 * USA_BILLION;
		const btcPerPerson = btcRemainTSupply / worldPopulation;

		const btcHodlPercOfRemainTSupply = (this.state.btcHodl * 100) / btcRemainTSupply;

		// https://www.universetoday.com/25756/surface-area-of-the-earth/
		// inludes inhabitable land
		const earthLandSurface = 149 * MILLION; // km^2
		const landPerPerson = earthLandSurface / worldPopulation;

		// https://en.wikipedia.org/wiki/Gold#cite_note-7
		// https://www.gold.org/about-gold/gold-supply
		const goldAboveGround = 186700 /* tons */ * KILO; // kg
		const goldPerPerson = goldAboveGround / worldPopulation;

		// https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/
		const moneySupply = {
			narrowMoney: 36.8 * USA_TRILLION,
			broadMoney: 90.4 * USA_TRILLION,
		};
		const coinsAndBankNotes = moneySupply.narrowMoney * USA_TRILLION;
		const coinsAndBankNotesPerPerson = coinsAndBankNotes / worldPopulation;

		// https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza
		const gizaPyramidMass = 5.9 * MILLION * 1000; // kg
		const gizaPyramidPerPerson = gizaPyramidMass / worldPopulation;

		// https://www.carsguide.com.au/car-advice/how-many-cars-are-there-in-the-world-70629
		const cars = 1.4 * USA_BILLION;
		const carsPerPerson = cars / worldPopulation;

		const usaMillionaireMedian = 1.87 * MILLION;
		const usaMillionaireMedianNarrowPercent = (usaMillionaireMedian * 100) / moneySupply.narrowMoney;
		const usaMillionaireMedianNarrowPercentInBtc = usaMillionaireMedianNarrowPercent * btcRemainTSupply;
		const usaMillionaireMedianBroadPercent = (usaMillionaireMedian * 100) / moneySupply.broadMoney;
		const usaMillionaireMedianBroadPercentInBtc = usaMillionaireMedianBroadPercent * btcRemainTSupply;

    return (
			<div>
			<form onSubmit={e => e.preventDefault()}>
		    ₿<input name="btc-hodl" value={btcHodl}
		            onChange={e => this.updateBtcHodl(e)} />
			</form>

			<div>
				<h2>money supply</h2>
				broad money: {f.usd(moneySupply.broadMoney)}
			</div>
			<div>
				<h2>millionaire net worth</h2>
				median {f.usd(usaMillionaireMedian)}
				<br />
				&nbsp;equal to {f.per(usaMillionaireMedianBroadPercent)} of broad
				<br />
				same level of wealth in BTC is 
				₿{f.sat(usaMillionaireMedianBroadPercentInBtc)}
			</div>	

			<div>
				<h2>BTC stats</h2>
				Cap ₿ {btcTCap}
				<br/>
				Lost ₿ {f.btc(btcLost)} ({this.state.btcLostPerc * 100}%)
				<br />
				Remaining ₿ {f.btc(btcRemainTSupply)}
				<br />
			</div>

		  <div>
				<h2>Gold</h2>
				pop. {f.dec(worldPopulation)}
				<br />
				gold {f.dec(goldAboveGround)} kg
				<br/>
				gold {(goldPerPerson * KILO).toFixed(3)} gr
				&nbsp;{(goldPerPerson * TROY_OUNCE).toFixed(3)} troy ounce
				<br/>
				BTC per person ₿ {btcPerPerson.toFixed(8)}
			</div>

			<br/>

			<div>
				<h2>Land</h2>
				land surface {f.dec(earthLandSurface)} km<sup>2</sup>
				<br/>
				land per person
				<br/>
				{f.dec(landPerPerson)} km<sup>2</sup>
				<br/>
				{f.dec(landPerPerson * 1000000)} m<sup>2</sup> 
				<br/>
				{f.dec(landPerPerson * ACRE)} acres
				<br/>
				{f.dec(landPerPerson * SQUARE_FEET)} sqft
			</div>
			<div>
				<h2>cars</h2>
				per person {f.dec(carsPerPerson)}
				<br />
				1 car = {f.dec(1 / carsPerPerson)} people
				<br />
				that many people % share in BTC = ₿{f.sat(btcPerPerson * (1 / carsPerPerson))}
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
