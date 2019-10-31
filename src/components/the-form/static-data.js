
const MILLION = 1000000;
const USA_BILLION = MILLION * 1000;

const UNITS = {
  KILO: 1000,
  MILLION,
  USA_BILLION,
  USA_TRILLION: USA_BILLION * 1000,
  TROY_OUNCE: 32.150747, // 1 kg
  ACRE: 247.10538, // 1 km^2
  SQUARE_FEET: 10763910, // 1 km^2
};

const btcTCap = 21000000;
const worldPopulation = 7.7 * USA_BILLION;
const btcLostPerc = 0.2; // 20%
const btcLost = btcTCap * btcLostPerc;
const btcRemainTSupply = btcTCap - btcLost;
const btcPerPerson = btcRemainTSupply / worldPopulation;

// https://www.gold.org/about-gold/gold-supply/gold-mining/how-much-gold
const goldAboveGround = 190040 /* tons */ * UNITS.KILO; // kg
const goldPerPersonKg = goldAboveGround / worldPopulation;

// https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/
const moneySupply = {
  broadMoney: 90.4 * UNITS.USA_TRILLION,
};
const broadMoneyPerCapita = moneySupply.broadMoney / worldPopulation;

// https://www.fool.com/investing/general/2016/01/24/how-does-your-net-worth-compare-to-the-average-ame.aspx
const usaMillionaireMedian = 1.87 * MILLION;
const usaMillionaireMedianBroadPercent = (usaMillionaireMedian * 100) / moneySupply.broadMoney;
const usaMillionaireMedianBroadPercentInBtc = (usaMillionaireMedianBroadPercent * btcRemainTSupply) / 100;

// https://www.financialsamurai.com/top-one-percent-net-worth-amounts-by-age/
const netWorth1PercentMedian = 10.7 * UNITS.MILLION;
const netWorth1PercentMedianBroadMoneyPercent = (netWorth1PercentMedian * 100) / moneySupply.broadMoney;
const netWorth1PercentMedianBroadMoneyPercentInBtc = (netWorth1PercentMedianBroadMoneyPercent * btcRemainTSupply) / 100;

export default {
  UNITS,
  btcTCap,
  btcLostPerc,
  btcLost,
  btcRemainTSupply,
  worldPopulation,
  btcPerPerson,
  goldAboveGround,
  goldPerPersonKg,
  broadMoneyPerCapita,
  moneySupply,
  usaMillionaireMedian,
  usaMillionaireMedianBroadPercent,
  usaMillionaireMedianBroadPercentInBtc,
  netWorth1PercentMedian,
  netWorth1PercentMedianBroadMoneyPercent,
  netWorth1PercentMedianBroadMoneyPercentInBtc,
  btcHodlInIndividualShares: function(btcHodl) {
    return btcHodl / btcPerPerson;
  },
  btcHodlPercOfRemainTSupply: function(btcHodl) {
    return (btcHodl * 100) / btcRemainTSupply;
  },
};
