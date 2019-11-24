const writtenNumber = require('written-number');

export function fiatToWords(amount) {
  amount = amount && amount !== Infinity ? amount : 0;
  const whole = amount >= 1 ? Number.parseInt(amount) : 0;

  let text;
  if (whole) {
    const currText = whole === 1 ? 'dollar' : 'dollars';
    text = `${writtenNumber(whole)} ${currText}`;
  }

  const cents = (amount - whole).toFixed(2) * 100;
  if (cents) {
    const centsText = `${writtenNumber(cents)} cents`;

    if (text) {
      return `${text} and ${centsText}`;
    }
    
    return centsText;
  }

  return text;
}

// 1 Bitcoin (BTC) = 100,000,000 Satoshis
const ONE_HUNDRED_MILLION = 100000000;
export function btcToWords(amount) {
  amount = amount && amount !== Infinity ? amount : 0;
  const whole = amount >= 1 ? Number.parseInt(amount) : 0;

  let text;
  if (whole) {
    const currText = whole === 1 ? 'bitcoin' : 'bitcoins';
    text = `${writtenNumber(whole)} ${currText}`;
  }

  const sats = (amount - whole).toFixed(8) * ONE_HUNDRED_MILLION;
  if (sats) {
    const satsCurrText = sats === 1 ? 'satoshi' : 'satoshis';
    const satsText = `${writtenNumber(sats)} ${satsCurrText}`;

    if (text) {
      return `${text} and ${satsText}`;
    }

    return satsText;
  }

  return text;
}
