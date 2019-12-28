import {h, Component } from 'preact';
import style from './style';
import BtcSign from '../btc-sign';
import {
  numberToWords,
  btcToWords,
} from '../../utils/words';
import toWords from '../the-form/to-words';
import Link from '../link';
import staticData from '../../utils/static-data';
import f from '../../utils/formatter';
import { Text } from 'preact-i18n';

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
          <Text id="world.world-population">world population</Text>
        </p>

        {f.dec(worldPopulation)}
        <br />

        <p class="text-sm text-gray-700 mb-3">
          {numberToWords(worldPopulation)} <Text id="world.persons">persons</Text>
        </p>

        <p class="text-sm text-gray-700">
          <i class="icon-bitcoin text-2xl"></i>
          <br/>
          <Text id="world.bitcoin-supply">Bitcoin supply</Text>
        </p>
        {f.btc(btcRemainTSupply)}
        <p class="text-sm text-gray-700 mb-3">
          {btcToWords(btcRemainTSupply)}
        </p>

        <p class="text-sm text-gray-700">
          <i class="icon-person text-2xl"></i>
          <br />
          <Text id="world.bitcoin-for-each-person">Bitcoin for each person</Text>
          <br />
          {f.dec(btcRemainTSupply, P.MILLION.name)} / {f.dec(worldPopulation, P.BILLION.name)} =

          &nbsp;<BtcSign /> {f.btc(btcPerPerson)}
        </p>

        <Link queryParams={`btc=${btcPerPerson.toFixed(8)}`} hash='bitcoin'>
          {toWords.btc(btcPerPerson)}
        </Link>

        <p class="text-sm text-gray-700">
          {btcToWords(btcPerPerson)}
        </p>
      </div>
    );
  }

}
