
const million = 1000000;
const billion = million * 1000;
const trillion = billion * 1000;

const precision = {
  MILLION: {
    unit: million,
    name: 'Million',
  },
  BILLION: {
    unit: billion,
    name: 'Billion',
  },
  TRILLION: {
    unit: trillion,
    name: 'Trillion',
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

  satsDecimal: function(number, precision = null) {
    if (!number || number == Infinity) {
      return '0.00,000,000';
    }

    number = Number(number);
    number = number.toFixed(8);
    number = Number(number);

    let decimals = number % 1;
    const whole = number - decimals;

    const precisionMillion = Math.pow(10, 8);
    number = decimals * precisionMillion;

    number = this._dec.format(number);

    let charactersTotal = 10; // 8 + 2 commas

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

    // Sats precision
    if (precision) {
      const pIndex = number.indexOf('.');
      if (precision >= 3) { // keep 1 comma
        number = number.slice(0, (pIndex + 1) + precision + 1);
      } else if (precision >= 6) { // keep 2 commas
        number = number.slice(0, (pIndex + 1) + precision + 2);
      }
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
      case precision.TRILLION.name:
        p = precision.TRILLION; break;
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
