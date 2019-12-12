import {h, Component } from 'preact';
import style from './style';

export default class ArrSlider extends Component {

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
             value={values.indexOf(value)}
             onChange={(e) => this.onChangeHandler(e)}
             class={style['arr-slide']} />

      <datalist id={listId}>
        {values.map((el, i) => {
          if (i % 2 !== 0) {
            return (<option value={i}></option>);
          }
        })}
      </datalist>
      </div>
    );
  }

}
