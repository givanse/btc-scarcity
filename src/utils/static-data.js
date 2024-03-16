
const MILLION = 1000000;
const USA_BILLION = MILLION * 1000;

const UNITS = {
  KILO: 1000,
  MILLION,
  USA_BILLION,
  USA_TRILLION: USA_BILLION * 1000,
  TROY_OUNCE: 32.15075, // 1 kg
};

const totalGlobalIndividualWealth = 454.4 * UNITS.USA_TRILLION;
const totalAdultPopulation = 5.363266074 * UNITS.USA_BILLION;

const btcTCap = 21000000;
//const worldPopulation = 7.9 * USA_BILLION;
// https://fortune.com/2017/11/25/lost-bitcoins/
const btcLostPerc = 0.17; // 17%
const btcLost = btcTCap * btcLostPerc;
const btcRemainTSupply = btcTCap - btcLost;
const btcPerPerson = (btcRemainTSupply / totalAdultPopulation).toFixed(8);

// https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/
//const moneySupply = {
//  Wealth: 90.4 * UNITS.USA_TRILLION,
//};

// https://www.fool.com/investing/general/2016/01/24/how-does-your-net-worth-compare-to-the-average-ame.aspx
//const usaMillionaireMedian = 1.87 * MILLION;
//const usaMillionaireMedianBroadPercent = (usaMillionaireMedian * 100) / moneySupply.Wealth;
//const usaMillionaireMedianBroadPercentInBtc = (usaMillionaireMedianBroadPercent * btcRemainTSupply) / 100;

const mMillionaire = 2 * MILLION;
const mMillionaireBroadPercent = (mMillionaire * 100) / totalGlobalIndividualWealth;
const mMillionaireBroadPercentInBtc = (mMillionaireBroadPercent * btcRemainTSupply) / 100;

// https://www.forbes.com/billionaires/#6425b8a251c7
//const usaBillionaireAverage = 1 * UNITS.USA_BILLION; //(8.7 * UNITS.USA_TRILLION) / 2153;
//const usaBillionaireAverageBroadPercent = (usaBillionaireAverage * 100) / totalGlobalIndividualWealth;
//const usaBillionaireAverageBroadPercentInBtc = (usaBillionaireAverageBroadPercent * btcRemainTSupply) / 100;

// https://www.financialsamurai.com/top-one-percent-net-worth-amounts-by-age/
const pointOnePercenter = 5 * UNITS.MILLION;
const pointOnePercenterWealthPercent = (pointOnePercenter * 100) / totalGlobalIndividualWealth;
const pointOnePercenterWealthPercentInBtc = (pointOnePercenterWealthPercent * btcRemainTSupply) / 100;

function buyGoldOunces(fiat, goldPricePerOz) {
  return fiat / goldPricePerOz;
}

/*
function fiatPercOfGold(fiat, goldPricePerOz) {
  const boughtGoldOz = buyGoldOunces(fiat, goldPricePerOz);
  const goldKilosBought = boughtGoldOz * 0.03110348;
  return (goldKilosBought * 100) / goldAboveGroundKg;
}
*/

function calcPyramidLevel(adults, usd) {

  const popPercent = ((adults * 100) / totalAdultPopulation);
  console.log('pop ', popPercent);

  const totalWealthPercent = (usd * 100) / totalGlobalIndividualWealth;
  // Supply - 100%
  //    BTC - percent
  const btc = (totalWealthPercent * btcRemainTSupply) / 100;

  return {
    adults,
    popPercent,
    wealth: {
      usd,
      btc,
    }
  }
}

function buildPyramid() {
  return [
    calcPyramidLevel(2818118000, 10 * UNITS.KILO),
    calcPyramidLevel(1844084000, 10 * UNITS.KILO),
    calcPyramidLevel(641673000,	100 * UNITS.KILO),
    calcPyramidLevel(51549760, UNITS.MILLION),
    calcPyramidLevel(5087934,	5 * UNITS.MILLION),
    calcPyramidLevel(2510318,	10 * UNITS.MILLION),
    calcPyramidLevel(163572, 50 * UNITS.MILLION),
    calcPyramidLevel(72474, 100 * UNITS.MILLION),
    calcPyramidLevel(7016, 500 * UNITS.MILLION),
  ];
}
const pyramid = buildPyramid();
pyramid[0].topPercent = 100.0;
for (let i = 1; i < pyramid.length; i++) {
  const level = pyramid[i];
  const prevLevel = pyramid[i - 1];
  console.log(prevLevel.topPercent + ' - ' +prevLevel.popPercent);
  level.topPercent = prevLevel.topPercent - prevLevel.popPercent;
}

export default {
  btcTCap,
  btcLostPerc,
  btcLost,
  btcRemainTSupply,
  totalAdultPopulation,
  btcPerPerson,
  //goldAboveGroundKg,
  //goldAboveGroundOz,
  //goldPerPersonKg,
  //goldPerPersonOz: goldPerPersonKg * UNITS.TROY_OUNCE,
  //WealthPerCapita,
  
  //usaMillionaireMedian,
  //usaMillionaireMedianBroadPercent,
  //usaMillionaireMedianBroadPercentInBtc,
  
  mMillionaire,
  mMillionaireBroadPercent,
  mMillionaireBroadPercentInBtc,

  //usaBillionaireAverage,
  //usaBillionaireAverageBroadPercent,
  //usaBillionaireAverageBroadPercentInBtc,

  pointOnePercenter,
  pointOnePercenterWealthPercent,
  pointOnePercenterWealthPercentInBtc,

  btcHodlInIndividualShares: function(btcHodl) {
    return btcHodl / btcPerPerson;
  },
  btcPercOfRemainTSupply: function(btc) {
    return (btc * 100) / btcRemainTSupply;
  },
  fiatPercOfWealth: function(fiat) {
    return (fiat * 100) / moneySupply.Wealth;
  },
  //buyGoldOunces,
  //fiatPercOfGold,
  UNITS,
  totalAdultPopulation,
  totalGlobalIndividualWealth,
  calcPyramidLevel,
  pyramid,
};
