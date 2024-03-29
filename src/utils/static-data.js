
const MILLION = 1000000;
const USA_BILLION = MILLION * 1000;

const UNITS = {
  KILO: 1000,
  MILLION,
  USA_BILLION,
  USA_TRILLION: USA_BILLION * 1000,
  TROY_OUNCE: 32.15075, // 1 kg
};

const btcTCap = 21000000;
const worldPopulation = 7.7 * USA_BILLION;
// https://fortune.com/2017/11/25/lost-bitcoins/
const btcLostPerc = 0.17; // 17%
const btcLost = btcTCap * btcLostPerc;
const btcRemainTSupply = btcTCap - btcLost;
const btcPerPerson = (btcRemainTSupply / worldPopulation).toFixed(8);

// https://www.gold.org/about-gold/gold-supply/gold-mining/how-much-gold
const goldAboveGroundKg = 190040 /* tons */ * 907.185; // kg
const goldAboveGroundOz = goldAboveGroundKg * 32.15075;
const goldPerPersonKg = goldAboveGroundKg / worldPopulation;

// https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/
const moneySupply = {
  broadMoney: 90.4 * UNITS.USA_TRILLION,
};
const broadMoneyPerCapita = moneySupply.broadMoney / worldPopulation;

// https://www.fool.com/investing/general/2016/01/24/how-does-your-net-worth-compare-to-the-average-ame.aspx
const usaMillionaireMedian = 1.87 * MILLION;
const usaMillionaireMedianBroadPercent = (usaMillionaireMedian * 100) / moneySupply.broadMoney;
const usaMillionaireMedianBroadPercentInBtc = (usaMillionaireMedianBroadPercent * btcRemainTSupply) / 100;

const usaMillionaireAverage = 4.03 * MILLION;
const usaMillionaireAverageBroadPercent = (usaMillionaireAverage * 100) / moneySupply.broadMoney;
const usaMillionaireAverageBroadPercentInBtc = (usaMillionaireAverageBroadPercent * btcRemainTSupply) / 100;

// https://www.forbes.com/billionaires/#6425b8a251c7
const usaBillionaireAverage = 1 * UNITS.USA_BILLION; //(8.7 * UNITS.USA_TRILLION) / 2153;
const usaBillionaireAverageBroadPercent = (usaBillionaireAverage * 100) / moneySupply.broadMoney;
const usaBillionaireAverageBroadPercentInBtc = (usaBillionaireAverageBroadPercent * btcRemainTSupply) / 100;

// https://www.financialsamurai.com/top-one-percent-net-worth-amounts-by-age/
const netWorth1PercentMedian = 10.7 * UNITS.MILLION;
const netWorth1PercentMedianBroadMoneyPercent = (netWorth1PercentMedian * 100) / moneySupply.broadMoney;
const netWorth1PercentMedianBroadMoneyPercentInBtc = (netWorth1PercentMedianBroadMoneyPercent * btcRemainTSupply) / 100;

function buyGoldOunces(fiat, goldPricePerOz) {
  return fiat / goldPricePerOz;
}

export default {
  btcTCap,
  btcLostPerc,
  btcLost,
  btcRemainTSupply,
  worldPopulation,
  btcPerPerson,
  goldAboveGroundKg,
  goldAboveGroundOz,
  goldPerPersonKg,
  goldPerPersonOz: goldPerPersonKg * UNITS.TROY_OUNCE,
  broadMoneyPerCapita,
  moneySupply,
  
  //usaMillionaireMedian,
  //usaMillionaireMedianBroadPercent,
  //usaMillionaireMedianBroadPercentInBtc,
  
  usaMillionaireAverage,
  usaMillionaireAverageBroadPercent,
  usaMillionaireAverageBroadPercentInBtc,

  usaBillionaireAverage,
  usaBillionaireAverageBroadPercent,
  usaBillionaireAverageBroadPercentInBtc,

  netWorth1PercentMedian,
  netWorth1PercentMedianBroadMoneyPercent,
  netWorth1PercentMedianBroadMoneyPercentInBtc,

  btcHodlInIndividualShares: function(btcHodl) {
    return btcHodl / btcPerPerson;
  },
  btcPercOfRemainTSupply: function(btc) {
    return (btc * 100) / btcRemainTSupply;
  },
  fiatPercOfBroadMoney: function(fiat) {
    return (fiat * 100) / moneySupply.broadMoney;
  },
  buyGoldOunces,
  fiatPercOfGold: function(fiat, goldPricePerOz) {
    const boughtGoldOz = buyGoldOunces(fiat, goldPricePerOz);
    const goldKilosBought = boughtGoldOz * 0.03110348;
    return (goldKilosBought * 100) / goldAboveGroundKg;
  }
};
