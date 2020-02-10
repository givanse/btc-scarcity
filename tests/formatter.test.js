import f from '../src/utils/formatter';

describe('btc', () => {
  
  test('1.001', () => {
    const r = f.btc('1.001');
    expect(r).toBe('1.00100000');
  });
  
});
