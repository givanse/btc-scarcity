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

        <table class="w-full sm:w-full md:w-5/6 lg:w-4/5 mt-4">
          <tr class="text-sm text-gray-700">
            <td class="pl-4">
              <Text id="world.bitcoin-supply">bitcoin supply</Text>
              <br/>
              <i class="icon-bitcoin text-xl"></i>
              {f.whole(btcRemainTSupply)}

              <hr class="border-1 border-slate-700 border-2"></hr>

              <i class="icon-person text-xl"></i>
              {f.dec(worldPopulation)}
              <br />
              <Text id="world.world-population">world population</Text>
            </td>

            <td class="px-4 text-sm">
              <Text id="world.bitcoin-for-each-person">
                bitcoin for each person
              </Text>
              <br/>

              <p class="text-lg">
                <Link queryParams={`btc=${btcPerPerson}`} hash='bitcoin'>
                  <i class="icon-bitcoin"></i>
                  {f.satsDecimal(btcPerPerson)}
                </Link>
                <br />
                <i class="icon-person text-xl"></i>
              </p>
            </td>
          </tr>
        </table>

      </div>
    );
  }

}
