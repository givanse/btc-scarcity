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
  _usd: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0}),
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
  _btc: new Intl.NumberFormat('en-US', {style: 'decimal', maximumFractionDigits: 8}),
  btc: function(number) {
    return this._btc.format(number);
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
