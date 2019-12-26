import { buildSearch } from '../src/components/the-form/router';

describe('buildSearch', () => {
  
  test('ignores zeros', () => {
    let r = buildSearch(0.0, 0.0);
    expect(r).toBe('');

    r = buildSearch(0.0001, 0.0);
    expect(r).toBe('btc=0.0001');

    r = buildSearch(0.0, 1);
    expect(r).toBe('fiat=1');
  });

});

