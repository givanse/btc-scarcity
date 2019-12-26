import staticData from '../src/utils/static-data';
// See: https://github.com/mzgoddard/preact-render-spy
//import { shallow } from 'preact-render-spy';

describe('Static Data', () => {
	test('btcHodlPercOfRemainTSupply', () => {
		const btcHodl = 1890000;
		const r = staticData.btcPercOfRemainTSupply(btcHodl);
		expect(r).toBe(10);
	});

	test('btcPerPerson', () => {
		expect(staticData.btcPerPerson).toBe(0.0024545454545454545);
  });
  
  test('btcPercOfRemainTSupply', () => {
    const amount = 4725000;
    const r = staticData.btcPercOfRemainTSupply(amount);
    expect(r).toBe(25);
  });
  
  test('fiatPercOfBroadMoney', () => {
    const amount = 22.6 * 1000000 * 1000 * 1000;
    const r = staticData.fiatPercOfBroadMoney(amount);
    expect(r).toBe(25);
  });
  
  test('buyGoldOunces', () => {
    const amount = 1000000000;
    const r = staticData.buyGoldOunces(amount);
    expect(r).toBe(666666.6666666666);
  });
  
  test('fiatPercOfGold', () => {
    const amount = 1000000000;
    const r = staticData.fiatPercOfGold(amount);
    expect(r).toBe(0.012027540863956472);
  });

});
