import {h, Component } from 'preact';
import style from './style';
import BtcSign from '../btc-sign';
import {
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
          world population
        </p>
        {f.dec(worldPopulation)}
        <p class="text-sm text-gray-700 mb-3">
          seven billion seven hundred million
        </p>

        <p class="text-sm text-gray-700">
          bitcoin supply
        </p>
        <BtcSign /> {f.btc(btcRemainTSupply)}
        <p class="text-sm text-gray-700 mb-3">
          {btcToWords(btcRemainTSupply)}
        </p>

        <p class="text-sm text-gray-700">
          bitcoin available for each person
          <br />
          <BtcSign /> {f.dec(btcRemainTSupply, P.MILLION.name)} / {f.dec(worldPopulation, P.BILLION.name)} =
          &nbsp;<BtcSign /> {f.sat(btcPerPerson)}
        </p>
        {toWords.btc(btcPerPerson)}
      </div>
    );
  }

}
