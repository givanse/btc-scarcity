import staticData from '../src/utils/static-data';
// See: https://github.com/mzgoddard/preact-render-spy
//import { shallow } from 'preact-render-spy';

describe('Static Data', () => {

  test('fiatPercOfWealth', () => {
    const amount = 22.6 * 1000000 * 1000 * 1000;
    const r = staticData.fiatPercOfWealth(amount);
    expect(r).toBe(25);
  });
  
  test('buyGoldOunces', () => {
    const amount = 1000000000;
    const r = staticData.buyGoldOunces(amount, 1500);
    expect(r).toBe(666666.6666666666);
  });
  
  test('fiatPercOfGold', () => {
    const amount = 1000000000;
    const r = staticData.fiatPercOfGold(amount, 1500);
    expect(r).toBe(0.012027540863956472);
  });

});
