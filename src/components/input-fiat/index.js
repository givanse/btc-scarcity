import {h, Component } from 'preact';
import style from './style';
import f from '../the-form/formatter';
import ArrSlider from '../arr-slider';

const FIAT_SLIDER_VALUES = [
  1,
  2,
  5,
  10,
  15,

  20,
  25,
  50,
  75,
  100,

  150,
  250,
  500,
  1000,
  1500,

  10000,
  50000,
  100000,
  500000,
  1000000, // million
  
  1000000000, // billion
  50000000000,
  100000000000,
  1000000000000,
];

export default class InputFiat extends Component {

  render() {
    const {
      fiatPurchase,
      updateFiatPurchase,
      updateValue,
    } = this.props;

    return (
      <form class="text-center" onSubmit={e => e.preventDefault()}>
        <input name="fiat-purchase"
               value={'$' + f.dec(fiatPurchase)}
               class={style['btc-hodl']}
               placeholder="dollar amount"
               onChange={updateFiatPurchase} />

        <br />
        <ArrSlider name="fiat-purchase-range"
                   value={fiatPurchase}
                   values={FIAT_SLIDER_VALUES}
                   updateValue={updateValue} />
      </form>
    );
  }

}
