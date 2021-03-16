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

        <p class="text-sm text-gray-700">
          <i class="icon-person text-3xl"></i>
          <br />
          <span class="text-lg">
          <Link queryParams={`btc=${btcPerPerson}`} hash='bitcoin'>
            <BtcSign />{f.btc(btcPerPerson)}
          </Link>
          </span>
          <br />
          <Text id="world.bitcoin-for-each-person">Bitcoin for each person</Text>
          <br />
          
        </p>
        <p class="text-sm text-gray-700">
          {f.dec(btcRemainTSupply, P.MILLION.name)} / {f.dec(worldPopulation, P.BILLION.name)}
        </p>

        <div class="flex">
          <div class="flex-1">
            <p class="text-sm text-gray-700">
              <i class="icon-bitcoin text-xl"></i> {f.whole(btcRemainTSupply)}
              <br/>
              <Text id="world.bitcoin-supply">Bitcoin supply</Text>
            </p>
          </div>

          <div class="flex-1">
            <p class="text-sm text-gray-700">
              <i class="icon-globe text-xl"></i> {f.dec(worldPopulation)}
              <br />
              <Text id="world.world-population">world population</Text>
            </p>

          </div>
        </div>

      </div>
    );
  }

}
