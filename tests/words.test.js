import { numberToWords } from '../src/components/the-form/words';

describe('numberToWords', () => {
  
  test('accepts null', () => {
    let r = numberToWords(null);
    expect(r).toBe('');
  });
  
  test('accepts 0', () => {
    let r = numberToWords(0);
    expect(r).toBe('');
  });
  
  test('accepts 1', () => {
    let r = numberToWords(1);
    expect(r).toBe('uno');
  });

});

