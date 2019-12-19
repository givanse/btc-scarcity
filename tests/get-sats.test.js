import getSats from '../src/utils/get-sats';

describe('getSats', () => {
  
  test('accepts null', () => {
    let {btc, sats} = getSats(null);
    expect(btc).toBe(0);
    expect(sats).toBe(0);
  });

  test('accepts Infinity', () => {
    let {btc, sats} = getSats(Infinity);
    expect(btc).toBe(0);
    expect(sats).toBe(0);
  });

  test('outputs one bitcoin', () => {
    let {btc, sats} = getSats(1);
    expect(btc).toBe(1);
    expect(sats).toBe(0);
  });

  test('outputs one satoshi', () => {
    let {btc, sats} = getSats(0.00000001);
    expect(btc).toBe(0);
    expect(sats).toBe(1);
  });

  test('infinite decimal is truncated', () => {
    let {btc, sats} = getSats(1/3);
    expect(btc).toBe(0);
    expect(sats).toBe(33333333);
  });

});

