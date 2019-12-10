import {h, Component } from 'preact';
import style from './style';

export default class ArrSlider extends Component {

  buildOptions(values) {
    for (let i = 1; i < values.length; i++) {
      return 
    }
  } 

  render() {
    const max = this.props.values.length - 1;

    const value = this.props.value;
    const values = this.props.values;
    const name = this.props.name;
    const listId = `${name}-arr-slider`;

    return (
      <div>
      <input type="range"
             name={this.props.name}
             list={listId}
             min="0" max={max} step="1"
             value={values.indexOf(value)}
             onChange={this.props.rangeUpdateBtcHodl}
             class="w-11/12" />

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