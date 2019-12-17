
// 1 Bitcoin (BTC) = 100,000,000 Satoshis
const ONE_HUNDRED_MILLION = 100000000;
const ONE_SAT = 0.00000001;

export default function getSats(amount) {
  amount = amount && amount !== Infinity ? amount : 0;
  const whole = amount >= 1 ? Number.parseInt(amount) : 0;

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
