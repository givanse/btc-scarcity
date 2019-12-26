
// 1 Bitcoin (BTC) = 100,000,000 Satoshis
const ONE_HUNDRED_MILLION = 100000000;
const ONE_SAT = 0.00000001; 
export const TO_FIXED_MAX = 100;

export function truncate(number, decimalsPrecison) {
  number = number.toFixed(TO_FIXED_MAX);

  const dotIndex = number.indexOf('.');
  number = number.substring(0, dotIndex + decimalsPrecison + 1);

  return Number.parseFloat(number);
}

export function parseBitcoin(number) {
  return truncate(number, 8);
}

export function getSats(amount) {
  amount = amount && amount !== Infinity ? amount : 0;
  const whole = ~~amount;

  let sats = (amount - whole);
  if (sats < ONE_SAT) {
    sats = 0;
    return {btc: whole, sats};
  }

  sats = sats * ONE_HUNDRED_MILLION;
  sats += Number.EPSILON;
  sats = sats.toPrecision(8);
  sats = Number.parseInt(sats);

  return {btc: whole, sats};
}