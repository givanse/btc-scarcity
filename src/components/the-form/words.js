const writtenNumber = require('written-number');
import getSats from './get-sats';

let LANG = 'en';

export function numberToWords(amount) {
  const lang = LANG;
  amount = amount && amount !== Infinity ? amount : 0;
  const whole = amount >= 1 ? Number.parseInt(amount) : 0;

  let text;
  if (whole) {
    text = writtenNumber(whole, {lang});
  }

  const cents = (amount - whole).toFixed(2) * 100;
  if (cents) {
    const centsText = `point ${writtenNumber(cents, {lang})}`;

    if (text) {
      return `${text} ${centsText}`;
    }
    
    return centsText;
  }

  return text;

}

export function fiatToWords(amount) {
  const lang = LANG;

  let centsText; let dollarText; let dollarsText;
  switch(lang) {
    case 'es':
      dollarText = 'dolar';
      dollarsText = 'dolares';
      centsText = 'centavos';
      break;
    default:
      dollarText = 'dollar';
      dollarsText = 'dollars';
      centsText = 'cents';
  }

  amount = amount && amount !== Infinity ? amount : 0;
  const whole = amount >= 1 ? Number.parseInt(amount) : 0;

  let text;
  if (whole) {
    const currText = whole === 1 ? dollarText : dollarsText;
    text = `${writtenNumber(whole, {lang})} ${currText}`;
  }

  const cents = (amount - whole).toFixed(2) * 100;
  if (cents) {
    const centsText = `${writtenNumber(cents, {lang})} ${centsText}`;

    if (text) {
      return `${text} and ${centsText}`;
    }
    
    return centsText;
  }

  return text;
}

export function btcToWords(amount) {
  const lang = LANG;
  amount = amount.toFixed(8);

  const {btc, sats} = getSats(amount);

  let text;
  if (btc) {
    const currText = btc === 1 ? 'Bitcoin' : 'Bitcoins';
    text = `${writtenNumber(btc, {lang})} ${currText}`;
  }

  if (sats) {
    const satsCurrText = sats === 1 ? 'Satoshi' : 'Satoshis';
    const satsText = `${writtenNumber(sats, {lang})} ${satsCurrText}`;

    if (text) {
      return `${text} and ${satsText}`;
    }

    return satsText;
  }

  return text;
}

export function setLang(lang = 'en') {
  LANG = lang;
}
