import {h, Component } from 'preact';
import style from './style';
import Link from '../link';
import staticData from '../../utils/static-data';
import f from '../../utils/formatter';
import { Text } from 'preact-i18n';

const {
  btcRemainTSupply,
  btcPerPerson,
  totalAdultPopulation,
} = staticData;

export default class PerPerson extends Component {

  render() {

    return (
      <div class="text-center">

        <div id="world" class="block pt-4">
          <a href="#world" class="cursor-pointer">
            <h2 class="bg-blue-600 text-white ">
              <Text id="world.title">For each person</Text>
            </h2>
          </a>
        </div>

        <p class="px-4">
          <Text id="world.intro">
            How much Bitcoin would a person get if we gave some to every person in the world?
          </Text>
        </p>

        <table class="w-full sm:w-full md:w-5/6 lg:w-4/5 mt-4 m-auto">
          <tr class="text-gray-400">
            <td class="pl-4 flex flex-col text-right">
              <div class="text-xs">
                <Text id="world.bitcoin-supply">bitcoin supply</Text>
              </div>

              <div class="text-white">
                {f.whole(btcRemainTSupply)}
                <i class="icon-bitcoin"></i>
              </div>

              <hr class="ml-auto my-2 w-3/5 block border-gray-700 border-2"></hr>

              <div class="text-white">
                {f.dec(totalAdultPopulation)}
                <i class="icon-person"></i>
              </div>

              <div class="text-xs">
                <Text id="world.adult-population">adult population</Text>
              </div>
            </td>

            <td class="px-4 text-sm">
              <span class="text-xs">
                <Text id="world.bitcoin-for-each-person">
                  bitcoin for each person
                </Text>
              </span>
              <br/>

              <p class="text-lg">
                <Link queryParams={`btc=${btcPerPerson}`} hash='bitcoin'>
                  <i class="icon-bitcoin text-xl"></i>
                  {f.satsDecimal(btcPerPerson)}
                </Link>
                <br />
                <i class="icon-person text-2xl"></i>
              </p>
            </td>
          </tr>
        </table>

      </div>
    );
  }

}
