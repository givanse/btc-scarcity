const precision = {
  MILLION: {
    unit: 1000000,
    name: 'M',
  },
  BILLION: {
    unit: 1000000000,
    name: 'B',
  },
};

export default {
  PRECISION: precision,
  _usd: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}),
  usd: function(number, precisionName) {
    let p;
    switch(precisionName) {
      case precision.BILLION.name:
        p = precision.BILLION; break;
    }

    if (p) {
      number = number / p.unit;
      return `${this._usd.format(number)} ${p.name}`;
    }

    return this._usd.format(number);
  },
  _btc: new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 8,
    maximumFractionDigits: 8}),
  btc: function(number) {
    return this._btc.format(number);
  },

  satsDecimal: function(number) {
    if (!number || number == Infinity) {
      return '0.00,000,000';
    }

    number = Number(number);
    number = number.toFixed(8);
    number = Number(number);
    const oneHundredMillion = 100000000;
    const decimals = number % 1;
    const whole = number - decimals;
    number = decimals * oneHundredMillion;
    number = this._dec.format(number);

    const charactersTotal = 10; // 8 digits, 2 commas
    const delta = charactersTotal - number.length;
    switch (delta) {
      case 10: number = '00,000,000' + number; break;
      case 9: number = '00,000,00' + number; break; 
      case 8: number = '00,000,0' + number; break;
      case 7: number = '00,000,' + number; break;
      case 6: number = '00,000' + number; break;
      case 5: number = '00,00' + number; break;
      case 4: number = '00,0' + number; break;
      case 3: number = '00,' + number; break;
      case 2: number = '00' + number; break;
      case 1: number = '0' + number; break;
    }

    if (whole) {
      return whole + '.' + number;
    }

    return '0.' + number;
  },

  _dec: new Intl.NumberFormat('en-US', {style: 'decimal', maximumFractionDigits: 2}),
  dec: function(number, precisionName) {
    let p;
    switch(precisionName) {
      case precision.BILLION.name:
        p = precision.BILLION; break;
      case precision.MILLION.name:
        p = precision.MILLION; break;
    }

    if (p) {
      number = number / p.unit;
      return `${this._dec.format(number)} ${p.name}`;
    }

    return this._dec.format(number);
  },
  decSmall: function(number) {
    const d = new Intl.NumberFormat('en-US', {style: 'decimal', maximumFractionDigits: 3});
    return d.format(number);
  },

  whole: function(number) {
    const d = new Intl.NumberFormat('en-US', {style: 'decimal', maximumFractionDigits: 0});
    return d.format(number);
  },

  _per: new Intl.NumberFormat('en-US', {
    style: 'percent',
    //minimumFractionDigits: 8, maximumFractionDigits: 8,
    //minimumSignificantDigits: 2,
    maximumSignificantDigits: 3}),
  per: function(number) {
    // times 100 because I rather do the rule of thirds myself
    return this._per.format(number / 100);
  }
};
