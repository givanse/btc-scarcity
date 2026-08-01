import staticData from '../src/utils/static-data';
// See: https://github.com/mzgoddard/preact-render-spy
//import { shallow } from 'preact-render-spy';

describe('Static Data', () => {

  test('fiatPercOfWealth', () => {
    const amount = staticData.totalGlobalIndividualWealth / 4;
    const r = staticData.fiatPercOfWealth(amount);
    expect(r).toBe(25);
  });

  test('btcPercOfRemainTSupply', () => {
    const r = staticData.btcPercOfRemainTSupply(staticData.btcRemainTSupply);
    expect(r).toBe(100);
  });

});
