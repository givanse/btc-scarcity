
// 1 Bitcoin (BTC) = 100,000,000 Satoshis
const ONE_HUNDRED_MILLION = 100000000;

export default function getSats(amount) {
  amount = amount && amount !== Infinity ? amount : 0;
  const whole = amount >= 1 ? Number.parseInt(amount) : 0;

  const sats = (amount - whole).toFixed(8) * ONE_HUNDRED_MILLION;

  return {btc: whole, sats};
}
