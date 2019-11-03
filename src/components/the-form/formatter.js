const precision = {
  billion: {
    unit: 1000000000,
    name: 'billion',
  },
};

export default {
  _usd: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0}),
  usd: function(number, precisionName) {
    let p;
    switch(precisionName) {
      case precision.billion.name:
        p = precision.billion; break;
    }

    if (p) {
      number = number / p.unit;
      return `${this._usd.format(number)} ${p.name}`;
    }

    return this._usd.format(number);
  },
  _btc: new Intl.NumberFormat('en-US', {style: 'decimal'}),
  btc: function(number) {
    return this._btc.format(number);
  },

  _dec: new Intl.NumberFormat('en-US', {style: 'decimal', maximumSignificantDigits: 3}),
  dec: function(number, precisionName) {
    let p;
    switch(precisionName) {
      case precision.billion.name:
        p = precision.billion; break;
    }

    if (p) {
      number = number / p.unit;
      return `${this._dec.format(number)} ${p.name}`;
    }

    return this._dec.format(number);
  },
  _sat: new Intl.NumberFormat('en-US', {style: 'decimal', minimumFractionDigits: 8}),
  sat: function(number) {
    return this._sat.format(number);
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
