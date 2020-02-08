const writtenNumber = require('written-number');
import { getSats } from './bitcoin-math';

export const ES = 'es';
export const EN = 'en';

let LANG = ES;

export function numberToWords(amount) {
  const lang = LANG;
  amount = amount && amount !== Infinity ? amount : 0;
  const whole = amount >= 1 ? Number.parseInt(amount) : 0;

  let text = '';

  if (amount == 1 && lang == ES) {
    return 'un dolar';
  }

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
    case EN:
      dollarText = 'dollar';
      dollarsText = 'dollars';
      centsText = 'cents';
      break;
    case ES:
    default:
      if (amount === 1) {
        return 'un dolar';
      }
      dollarText = 'dolar';
      dollarsText = 'dolares';
      centsText = 'centavos';
      break;
  }


  amount = amount && amount !== Infinity ? amount : 0;
  const whole = amount >= 1 ? Number.parseInt(amount) : 0;

  let text;
  if (whole) {
    const currText = whole === 1 ? dollarText : dollarsText;
    text = `${writtenNumber(whole, {lang})} ${currText}`;
  }

  const cents = (amount - whole).toFixed(2) * 100;
  if (!cents) {
    return text;
  }

  centsText = `${writtenNumber(cents, {lang})} ${centsText}`;

  if (text) {
    return `${text} and ${centsText}`;
  }
  
  return centsText;
}

export function btcToWords(amount) {
  const lang = LANG;
  amount = amount.toFixed(8);

  const {btc, sats} = getSats(amount);

  let text;
  if (btc) {
    const currText = btc === 1 ? 'bitcoin' : 'bitcoins';
    text = `${writtenNumber(btc, {lang})} ${currText}`;
  }

  if (sats) {
    const satsCurrText = sats === 1 ? 'satoshi' : 'satoshis';
    const satsText = `${writtenNumber(sats, {lang})} ${satsCurrText}`;

    if (text) {
      return `${text} and ${satsText}`;
    }

    return satsText;
  }

  return text;
}

export function setLang(lang) {
  lang = lang ? lang : ES;
  console.log('default lang:', lang);
  LANG = lang;
}
