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

const SAT_SIGN = ' sat';
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

        <div id="world" class="block pt-4">
          <a href="#world" class="cursor-pointer">
            <h2 class="bg-blue-600 text-white ">
              <Text id="world.title">Worldwide</Text>
            </h2>
          </a>
        </div>

        <p class="px-4">
          <Text id="world.intro">
            How much Bitcoin would a person get if we gave some to every person in the world?
          </Text>
        </p>

        <div class="flex">
          <div class="flex-1">
            <p class="text-sm text-gray-700">
              <i class="icon-bitcoin text-2xl"></i>
              <br/>
              <Text id="world.bitcoin-supply">Bitcoin supply</Text>
            </p>
            {f.whole(btcRemainTSupply)}
            <p class="text-sm text-gray-700 mb-3">
              {numberToWords(btcRemainTSupply)}
            </p>
          </div>

          <div class="flex-1">
            <p class="text-sm text-gray-700">
              <i class="icon-globe text-2xl"></i>
              <br />
              <Text id="world.world-population">world population</Text>
            </p>

            {f.dec(worldPopulation)}

            <p class="text-sm text-gray-700 mb-3">
              {numberToWords(worldPopulation)}
            </p>
          </div>
        </div>

        <p class="text-sm text-gray-700">
          <i class="icon-person text-2xl"></i>
          <br />
          <Text id="world.bitcoin-for-each-person">Bitcoin for each person</Text>
        </p>

        <BtcSign />{f.btc(btcPerPerson)}

        <p class="text-sm text-gray-700">
          {f.dec(btcRemainTSupply, P.MILLION.name)} / {f.dec(worldPopulation, P.BILLION.name)} = <BtcSign />{f.btc(btcPerPerson)}
        </p>

        <p class="px-4 mt-8">
          <Text id="world.explain-satoshis">
            Nobody would get a whole bitcoin, only a small fraction.
            The smallest fraction of a bitcoin is called a satoshi.
            One bitcoin is equal to one hundred million satoshis.
          </Text>
        </p>
        <br />
        <p class="text-center">
          <BtcSign />1 =&nbsp;
          <Link queryParams={`btc=${1}`} hash='bitcoin'>
            {f.whole(100000000)} {SAT_SIGN}
          </Link>
        </p>

        <p class="text-sm text-gray-700 mt-8">
          <i class="icon-person text-2xl"></i>
          <br />
          <Text id="world.satoshis-for-each-person">Satoshis for each person</Text>
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
