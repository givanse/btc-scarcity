import {h, Component } from 'preact';
import style from './style';
import BtcSign from '../btc-sign';
import {
  numberToWords,
  btcToWords,
} from '../the-form/words';
import toWords from '../the-form/to-words';
import staticData from '../the-form/static-data';
import f from '../the-form/formatter';

const P = f.PRECISION;

const {
  btcRemainTSupply,
  btcPerPerson,
  worldPopulation,
} = staticData;

export default class PerPerson extends Component {

  render() {

    return (
      <div class="text-center">

        <p class="text-sm text-gray-700">
          <i class="icon-globe text-2xl"></i>
          <br />
          world population
        </p>

        {f.dec(worldPopulation)}
        <br />

        <p class="text-sm text-gray-700 mb-3">
          {numberToWords(worldPopulation)} persons
        </p>

        <p class="text-sm text-gray-700">
          <i class="icon-bitcoin text-2xl"></i>
          <br/>
          Bitcoin supply
        </p>
        {f.btc(btcRemainTSupply)}
        <p class="text-sm text-gray-700 mb-3">
          {btcToWords(btcRemainTSupply)}
        </p>

        <p class="text-sm text-gray-700">
          <i class="icon-person text-2xl"></i>
          <br />
          bitcoin available for each person
          <br />
          {f.dec(btcRemainTSupply, P.MILLION.name)} / {f.dec(worldPopulation, P.BILLION.name)} =
          &nbsp;<BtcSign /> {f.sat(btcPerPerson)}
        </p>

        {toWords.btc(btcPerPerson)}
      </div>
    );
  }

}
