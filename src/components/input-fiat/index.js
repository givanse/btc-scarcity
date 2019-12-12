import {h, Component } from 'preact';
import style from './style';
import f from '../the-form/formatter';
import ArrSlider from '../arr-slider';

const MILLION = 1000000;

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
  200,
  250,
  500,
  1000,

  1500,
  5000,
  10000,
  50000,
  100000,

  500000,
  MILLION,
  MILLION * 1000,
  50 * MILLION * 1000,
  100 * MILLION * 1000,
];

export default class InputFiat extends Component {

  render() {
    const {
      fiatPurchase,
      updateFiatPurchase,
      updateValue,
      name,
    } = this.props;

    return (
      <form class="text-center" onSubmit={e => e.preventDefault()}>
        <label for={name} class="block w-0 h-0 overflow-hidden">
          fiat amount
        </label>
        <input id={name}
               name={name}
               value={'$' + f.dec(fiatPurchase)}
               class={style['btc-hodl']}
               placeholder="dollar amount"
               onChange={updateFiatPurchase} />

        <br />
        <ArrSlider name={name + "-input-range"}
                   value={fiatPurchase}
                   values={FIAT_SLIDER_VALUES}
                   updateValue={updateValue} />
      </form>
    );
  }

}
