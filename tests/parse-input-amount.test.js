import parseInputAmount from '../src/utils/parse-input-amount';

describe('parseInputAmount', () => {
  
  test('parses floats and ignores all characters', () => {
    let r = parseInputAmount('$1,000,000.01');
    expect(r).toBe(1000000.01);

    r = parseInputAmount('₿1,000.000000019');
    expect(r).toBe(1000.000000019);
  });

});

