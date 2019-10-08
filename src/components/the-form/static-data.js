
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

// https://www.universetoday.com/25756/surface-area-of-the-earth/
// includes inhabitable land
const earthLandSurface = 149 * UNITS.MILLION; // km^2
const landPerPerson = earthLandSurface / worldPopulation;

// https://en.wikipedia.org/wiki/Gold#cite_note-7
// https://www.gold.org/about-gold/gold-supply
const goldAboveGround = 186700 /* tons */ * UNITS.KILO; // kg
const goldPerPersonKg = goldAboveGround / worldPopulation;
const goldPerPersonKgPercentage = (goldPerPersonKg * 100) / goldAboveGround; 

// https://money.visualcapitalist.com/worlds-money-markets-one-visualization-2017/
const moneySupply = {
  narrowMoney: 36.8 * UNITS.USA_TRILLION,
  broadMoney: 90.4 * UNITS.USA_TRILLION,
};
const coinsAndBankNotes = moneySupply.narrowMoney * UNITS.USA_TRILLION;
const coinsAndBankNotesPerPerson = coinsAndBankNotes / worldPopulation;
const broadMoneyPerCapita = moneySupply.broadMoney / worldPopulation;

// https://www.carsguide.com.au/car-advice/how-many-cars-are-there-in-the-world-70629
const cars = 1.4 * USA_BILLION;
const carsPerPerson = cars / worldPopulation;
const personsPerCar = 1 / carsPerPerson;

const usaMillionaireMedian = 1.87 * MILLION;
const usaMillionaireMedianNarrowPercent = (usaMillionaireMedian * 100) / moneySupply.narrowMoney;
const usaMillionaireMedianNarrowPercentInBtc = usaMillionaireMedianNarrowPercent * btcRemainTSupply;
const usaMillionaireMedianBroadPercent = (usaMillionaireMedian * 100) / moneySupply.broadMoney;
const usaMillionaireMedianBroadPercentInBtc = (usaMillionaireMedianBroadPercent * btcRemainTSupply) / 100;

export default {
  UNITS,
  btcTCap,
  btcLostPerc,
  btcLost,
  btcRemainTSupply,
  worldPopulation,
  btcPerPerson,
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
  btcHodlInIndividualShares: function(btcHodl) {
    return btcHodl / btcPerPerson;
  },
  btcHodlPercOfRemainTSupply: function(btcHodl) {
    return (btcHodl * 100) / btcRemainTSupply;
  },
  cars,
  personsPerCar,
};
