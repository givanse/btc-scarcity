import {
  buildSearchString,
  readQueryParams,
  handleClickForLinkWithDataNavigate,
} from '../src/utils/router';

describe('buildSearchString', () => {
  
  test('ignores zeros', () => {
    let r = buildSearchString(0.0, 0.0);
    expect(r).toBe('');

    r = buildSearchString(0.0001, 0.0);
    expect(r).toBe('btc=0.0001');

    r = buildSearchString(0.0, 1);
    expect(r).toBe('fiat=1');
  });

  test('adds locale', () => {
    const r = buildSearchString(0.0, 0.0, 'gg');
    expect(r).toBe('loc=gg');
  });

});

describe('readQueryParams', () => {

  test('an empty search string yields defaults', () => {
    const {btc, fiat, loc} = readQueryParams('');
    expect(btc).toBe(0);
    expect(fiat).toBe(0);
    expect(loc).toBe(null);
  });

  test('parses a full search string', () => {
    const {btc, fiat, loc} = readQueryParams('?btc=0.00000001&fiat=6.21&loc=hf');
    expect(btc).toBe(0.00000001);
    expect(fiat).toBe(6.21);
    expect(loc).toBe('hf');
  });

  test('parses a partial search string', () => {
    const {btc, fiat, loc} = readQueryParams('?loc=zz');
    expect(btc).toBe(0);
    expect(fiat).toBe(0);
    expect(loc).toBe('zz');
  });

});

describe('handleClickForLinkWithDataNavigate', () => {

  test('deconstructs a local href', () => {
    const search = '?btc=100#bitcoin';
    const {btc, fiat, loc, hash} = handleClickForLinkWithDataNavigate(search); 
    expect(btc).toBe(100);
    expect(fiat).toBe(0);
    expect(loc).toBe(null);
    expect(hash).toBe('#bitcoin');
  });

});
