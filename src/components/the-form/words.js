const writtenNumber = require('written-number');
import getSats from './get-sats';

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

export function btcToWords(amount) {
  const {btc, sats} = getSats(amount);

  let text;
  if (btc) {
    const currText = btc === 1 ? 'Bitcoin' : 'Bitcoins';
    text = `${writtenNumber(btc)} ${currText}`;
  }

  if (sats) {
    const satsCurrText = sats === 1 ? 'Satoshi' : 'Satoshis';
    const satsText = `${writtenNumber(sats)} ${satsCurrText}`;

    if (text) {
      return `${text} and ${satsText}`;
    }

    return satsText;
  }

  return text;
}
