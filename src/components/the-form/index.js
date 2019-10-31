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

const btcPrice =  9000;

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
				<input name="btc-hodl"
               class={style['btc-hodl']}
							 placeholder="bitcoin amount_"
							 onChange={e => this.updateBtcHodl(e)} />
			</form>

			<div class="col-33-33-33 text-center m-auto md:max-w-xl">
				<div>
					₿ {f.sat(btcPerPerson)}
				</div>
				<div>
				</div>
				<div class="bg-blue-100">
					₿ {f.sat(btcHodl)}
				</div>

				<div>
					1
				</div>
				<div class="">people</div>
				<div>
					{f.dec(btcHodlInIndividualShares(btcHodl))}
				</div>


				<div>
					{f.dec(goldPerPersonKg * TROY_OUNCE)} oz
				</div>
        <div class="">gold</div>
				<div>
					{f.dec(btcHodlInIndividualShares(btcHodl) * goldPerPersonKg * TROY_OUNCE)} oz
				</div>

				<div>
				  {f.dec(btcPerPerson / usaMillionaireMedianBroadPercentInBtc)}
				</div>
			  <div class="">
					millionaires
				</div>
				<div>
				  {f.dec(btcHodl / usaMillionaireMedianBroadPercentInBtc)}
				</div>
			</div>

			<div class="text-center m-2">
				Today's Bitcoin price
				<br />
				{f.usd(btcPrice)}
			</div>

			<div class="col-50-50 text-center m-auto md:max-w-xl">
				<div>
					{f.usd(btcPerPerson * btcPrice)}
					<br />
					cost to own somebody's BTC share
				</div>
				<div>
					{f.usd(btcHodl* btcPrice)}
					<br />
					amount value
				</div>
			</div>

			<h2>Everyone</h2>
			<div class="text-center">
			  The world population is {f.dec(worldPopulation)}.
				<br />
				That is seven billion seven hundred million.
			</div>
			<h3>Broad Money</h3>
			<div class="col-33-33-33 text-center m-auto md:max-w-xl">
				<div>
					{f.usd(moneySupply.broadMoney)}<sup>*</sup>
				</div>
				<div>supply</div>
				<div>
					₿ {f.btc(btcRemainTSupply)}
				</div>

				<div>
					{f.usd(broadMoneyPerCapita)}
				</div>
				<div>per capita</div>
				<div>
					₿ {btcPerPerson.toFixed(8)}
				</div>
			</div>

      <h3>Gold</h3>
			<div class="col-33-33-33 text-center m-auto md:max-w-xl">
        <div>
				  {f.dec(goldAboveGround)}<sup>*</sup> kg
        </div>
				<div>supply</div>
				<div>
					₿ {f.btc(btcRemainTSupply)}
				</div>

        <div>
					{(goldPerPersonKg).toFixed(3)} kg
					&nbsp;or {(goldPerPersonKg * TROY_OUNCE).toFixed(3)} troy oz 
        </div>
				<div>per capita</div>
				<div>
					₿ {btcPerPerson.toFixed(8)}
				</div>
			</div>

		  <h2>Millionaire</h2>
			<div class="col-33-33-33 text-center m-auto md:max-w-xl">
		    <div>
					{f.usd(moneySupply.broadMoney)}
		    </div>
				<div>supply</div>
		    <div>
					₿ {f.btc(btcRemainTSupply)}
		    </div>

		    <div>
					{f.per(usaMillionaireMedianBroadPercent)}
		    </div>
				<div>net worth</div>
		    <div>
					{f.per(usaMillionaireMedianBroadPercent)}
		    </div>

		    <div>
					{f.usd(usaMillionaireMedian)}<sup>*</sup>
		    </div>
				<div>net worth</div>
		    <div>
				  ₿ {f.btc(usaMillionaireMedianBroadPercentInBtc)}
		    </div>
			</div>	

 		  <h2>BTC Stats</h2>
			<div class="text-center">
				Theoretical total supply ₿ {f.btc(btcTCap)}
				<br/>
				Lost estimate ₿ {f.btc(btcLost)} ({btcLostPerc * 100}%)
				<br />
				Remaining supply ₿ {f.btc(btcRemainTSupply)}
				<br />
				BTC per person ₿ {btcPerPerson.toFixed(8)}
			</div>

      <hr class="my-8" />

			<p class={style['foot-note']}> 
				* Broad money is the total value of the world's money. This includes coins, banknotes, money market accounts, as well as saving, checking, and time deposits.
				<br />
				<a href="https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/">
					Desjardins, J. (2017, October 26). All of the World's Money and Markets in One Visualization. Retrieved October 30, 2019.
				</a>
			</p>
			<p class={style['foot-note']}>
				* The best estimates currently available suggest that around 190,040 tonnes of gold has been mined throughout history.
				<br />
				<a href="https://www.gold.org/about-gold/gold-supply/gold-mining/how-much-gold">
					How much gold has been mined? (2017, December 14). Retrieved October 30, 2019.
				</a>
			</p>
			<p class={style['foot-note']}>* millionaire net worth median</p>
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
