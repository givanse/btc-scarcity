import {
  fiatToWords,
  numberToWords,
  setLang,
  ES,
  EN,
} from '../src/utils/words';

describe('numberToWords', () => {
  
  test('accepts null', () => {
    const r = numberToWords(null);
    expect(r).toBe('');
  });
  
  test('accepts 0', () => {
    const r = numberToWords(0);
    expect(r).toBe('');
  });
  
  test('un dolar', () => {
    setLang(ES);
    const r = numberToWords(1);
    expect(r).toBe('un dolar');
  });

});

describe('fiatToWords', () => {

  test('one dollar', () => {
    setLang(EN);
    const r = fiatToWords(1);
    expect(r).toBe('one dollar');
  });

});

