import {h, Component } from 'preact';
import style from './style';
import f from '../../utils/formatter';
import ArrSlider from '../arr-slider';
import { FIAT_SLIDER_VALUES } from '../../utils/constants';

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

        {this.props.children}

        <ArrSlider name={name + "-input-range"}
                   value={fiatPurchase}
                   values={FIAT_SLIDER_VALUES}
                   updateValue={updateValue} />
      </form>
    );
  }

}
