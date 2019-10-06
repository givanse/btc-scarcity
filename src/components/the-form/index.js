import { h, Component } from 'preact';
import style from './style';
import { tsImportEqualsDeclaration } from '@babel/types';

const MILLION = 1000000;
const USA_BILLION = MILLION * 1000;
const USA_TRILLION = USA_BILLION * 1000;

const TROY_OUNCE = 32.150747; // 1 kg
const ACRE = 247.10538; // 1 km^2
const SQUARE_FEET = 10763910; // 1 km^2

const MONEY = {
	// liquid money
	// The total amount of M0 (cash/coin) outside of the private banking system plus
	// the amount of demand deposits, travelers checks and other checkable deposits
	M1: 1,
	// M1 + most savings accounts, money market accounts, retail money market mutual funds, and
	// small denomination time deposits (certificates of deposit of under $100,000).
	M2: 1,
};

export default class TheForm extends Component {

	state = {
		btcHodl: 0.00000001,
		btcTCap: 21000000,
		// 20% 
		btcLostPerc: 0.2,
	};

	toFinancial(number, precision = 8) {
		let whole = Math.floor(number);
		let decimal;
		if (whole === 0) {
			decimal = number;
		} else {
		  decimal = number % whole;
		}
		decimal = decimal.toFixed(precision) + '';
		decimal = decimal.substring(2);

		const finPrec = 1000;

		let numberStr = '';
		while (whole >= finPrec) {
			let mod = whole % finPrec;
			if (mod === 0) {
        mod = '000';
			}

			if (numberStr) {
		    numberStr = `${mod},${numberStr}`;
			} else {
				numberStr = mod;
			}

			whole = Math.floor(whole / finPrec);
		}

		if (whole) {
		  if (numberStr) {
        numberStr = `${whole},${numberStr}`;
			} else {
        numberStr = '' + whole;
			}
		}

		if (!numberStr) {
			numberStr = '0';
		}

		if (decimal) {
		  return `${numberStr}.${decimal}`;
		} else {
			return numberStr;
		}
	}

	render() {
		const btcHodl = this.toFinancial(this.state.btcHodl);
		const btcTCap = this.toFinancial(this.state.btcTCap, 2);
		let btcLost = this.state.btcTCap * this.state.btcLostPerc;
		const remainingTotalSupply = this.state.btcTCap - btcLost;
		btcLost = this.toFinancial(btcLost, 2);
		const worldPopulation = 7.7 * USA_BILLION;
		const btcPerPerson = remainingTotalSupply / worldPopulation;

		// https://www.universetoday.com/25756/surface-area-of-the-earth/
		// inludes inhabitable land
		const earthLandSurface = 149 * MILLION; // km^2
		const landPerPerson = earthLandSurface / worldPopulation;

		// https://en.wikipedia.org/wiki/Gold#cite_note-7
		// https://www.gold.org/about-gold/gold-supply
		const goldAboveGround = 186700 * 907.1847; // kg
		const goldPerPerson = goldAboveGround / worldPopulation;

		// https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/
		const coinsAndBankNotes = 7.6 * USA_TRILLION;
		const coinsAndBankNotesPerPerson = coinsAndBankNotes / worldPopulation;

		// https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza
		const gizaPyramidMass = 5.9 * MILLION * 1000; // kg
		const gizaPyramidPerPerson = gizaPyramidMass / worldPopulation;

		// https://www.carsguide.com.au/car-advice/how-many-cars-are-there-in-the-world-70629
		const cars = 1.4 * USA_BILLION;
		const carsPerPerson = cars / worldPopulation;


    return (
			<form>
				₿<input name="btc-hodl" value={btcHodl} />
				<br />
				₿ {btcTCap}

				<div>
					lost {this.state.btcLostPerc * 100}%
          <br/>
				  ₿ {btcLost}
				  <br />
				  rem. sup. ₿ {this.toFinancial(remainingTotalSupply, 2)}
          <br/>
					pop. {this.toFinancial(worldPopulation, 0)}
          <br/>
					gold {this.toFinancial(goldAboveGround, 3)} kg
					<br />
					land surface {this.toFinancial(earthLandSurface, 2)} km<sup>2</sup>
				</div>
			  <br/>
				<div>
					per person
					<br/>
					gold {this.toFinancial(goldPerPerson, 3)} kg
					&nbsp;{this.toFinancial(goldPerPerson * TROY_OUNCE, 3)} troy ounce
					<br/>
					₿ {this.toFinancial(btcPerPerson)}
					<br/>
					land {landPerPerson.toFixed(2)} km<sup>2</sup>
					&nbsp;{(landPerPerson * 1000000).toFixed(2)} m<sup>2</sup> 
					&nbsp;{(landPerPerson * ACRE).toFixed(2)} acres
					&nbsp;{(landPerPerson * SQUARE_FEET).toFixed(2)} sqft
					<br />
					Giza p/person {gizaPyramidPerPerson.toFixed(2)} kg
					<br />
					Coins & Bank Notes ${coinsAndBankNotesPerPerson.toFixed(2)} USD
					<br />
					cars {carsPerPerson.toFixed(2)}
				</div>
			</form>
		);
	}

}
