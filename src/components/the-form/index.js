import { h, Component } from 'preact';
import style from './style';

export default class TheForm extends Component {

	state = {
		btcHodl: 0.00000001,
		btcTCap: 21000000,
		btcLost: 3000000.123,
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
      numberStr = `${whole},${numberStr}`;
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
		const btcLost = this.toFinancial(this.state.btcLost, 2);
		const remainingTotalSupply = this.state.btcTCap - this.state.btcLost;
		const worldPopulation = 7700000000;
		const btcPerPerson = remainingTotalSupply / worldPopulation;

		// https://en.wikipedia.org/wiki/Gold#cite_note-7
		// https://www.gold.org/about-gold/gold-supply
		const goldAboveGround = 186700 * 907.1847; // kg
		const goldPerPerson = goldAboveGround / worldPopulation;

    return (
			<form>
				₿<input name="btc-hodl" value={btcHodl} />
				₿<input name="btc-theoretical-cap" value={btcTCap} />
				₿<input name="btc-lost" value={btcLost} />

				<div>
				  ₿{this.toFinancial(remainingTotalSupply, 2)}
          /
					wp {this.toFinancial(worldPopulation, 0)}
					gold {this.toFinancial(goldAboveGround, 3)} kg
				</div>
			  <br/>
				<div>
					per person
					<br/>
					gold {this.toFinancial(goldPerPerson)} kg
					<br/>
					₿{this.toFinancial(btcPerPerson)}
				</div>
			</form>
		);
	}

}
