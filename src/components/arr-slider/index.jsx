/** @jsx h */
import {h, Component } from 'preact';
import style from './style.module.css';

function nearestIndex(values, value) {
  const exact = values.indexOf(value);
  if (exact !== -1) {
    return exact;
  }

  let best = 0;
  let bestDelta = Math.abs(values[0] - value);
  for (let i = 1; i < values.length; i++) {
    const delta = Math.abs(values[i] - value);
    if (delta < bestDelta) {
      best = i;
      bestDelta = delta;
    }
  }
  return best;
}

export default class ArrSlider extends Component {

  // Placeholder for optional datalist labels derived from values.
  buildOptions(values) {
    for (let i = 1; i < values.length; i++) {
      return 
    }
  }

  onChangeHandler(e) {
    const input = e.target;
    let number = Number.parseFloat(input.value);
    number = Number.isNaN(number) ? 0 : number;

    const newValue = this.props.values[number];

    this.props.updateValue(newValue);
  }

  render() {
    const max = this.props.values.length - 1;

    const {
      value,
      values,
      name,
    } = this.props;
    const listId = `${name}-arr-slider`;
    const sliderIndex = nearestIndex(values, value);

    return (
      <div>
      <label for={name} class="block w-0 h-0 overflow-hidden">
        fiat amount
      </label>

      <input type="range"
             id={name}
             name={name}
             list={listId}
             min="0" max={max} step="1"
             value={sliderIndex}
             onInput={(e) => this.onChangeHandler(e)}
             class={style['arr-slide']} />

      <datalist id={listId}>
        {values.map((el, i) => {
          if (i % 2 !== 0) {
            return (<option value={i}></option>);
          }
        })}
      </datalist>

      <table class={style['range-start-end']}>
        <tr>
          <td class="text-left">
            {this.props.children[0]}
          </td>
          <td class="text-right">
            {this.props.children[1]}
          </td>
        </tr>
      </table>

      </div>
    );
  }

}
