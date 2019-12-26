import {
  getSats,
  parseBitcoin,
  truncate,
  TO_FIXED_MAX,
 } from '../src/utils/bitcoin-math';

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

describe('truncate', () => {

  test('does not round numbers', () => {
    const r = truncate(0.00000001999, 8);
    expect(r).toBe(0.00000001);
  });

  test('works with negative numbers', () => {
    const r = parseBitcoin(-0.00000001999, 8);
    expect(r).toBe(-0.00000001);
  });

  test('handles 0', () => {
    const r = truncate(0, 8);
    expect(r).toBe(0);
  });

  test('preserves epsilon precision', () => {
    let r = truncate(Number.EPSILON, TO_FIXED_MAX);
    expect(r).toBe(Number.EPSILON);

    r = truncate(1 - Number.EPSILON, 16);
    expect(r).toBe(0.9999999999999997);
  });

});
