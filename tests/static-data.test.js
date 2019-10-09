import staticData from '../src/components/the-form/static-data';
// See: https://github.com/mzgoddard/preact-render-spy
//import { shallow } from 'preact-render-spy';

describe('Static Data', () => {
	test('btcHodlPercOfRemainTSupply', () => {
		const btcHodl = 1680000;
		const r = staticData.btcHodlPercOfRemainTSupply(btcHodl);
		expect(r).toBe(10);
	});

	test('btcPerPerson', () => {
		expect(staticData.btcPerPerson).toBe(0.002181818181818182);
	});
});
