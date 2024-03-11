import {h, Component } from 'preact';
import style from './style';
import { Text } from 'preact-i18n';
import f from '../../utils/formatter';
import Link from '../link';

export default class WealthPyramid extends Component {

  constructor(props) {
    super(props);
    // Create a ref object
    this.rootElement = null;
  }

  componentDidMount() {
    this.rootElement.querySelectorAll('svg > g').forEach(level => {
      level.addEventListener('mouseclick', () => {
      });
    });
  }

  render() {

    /**
     build an SVG pyramid
        - viewport is 0 0 90 90
        - base element has coordinates 0,90 90,90 85,80 5,80
        - from there, continue adding elements whose height is 10 and taper by 5
        - the pyramid has a total of 9 levels, including the base element
        - add the element number, from 1 to 9 for each level
        - don't add HTML comments
        - fill the elements with a solid color starting with rgb(162,156,139) and using darker colors until it ends with rgb(66,60,43)
     */
    return (
    <div ref={el => this.rootElement = el}>

      <p class="text-center mt-4 text-gray-400">
        global wealth range per adult
      </p>

      <table class="table-fixed w-full text-center my-4 text-gray-700">
        <tr>
          <td>
            <i class="icon-money text-4xl"></i>
          </td>
          <td>
            <i class="icon-person text-5xl"></i>
          </td>
          <td>
            <i class="icon-bitcoin text-4xl"></i>
          </td>
        </tr>
      </table>

      <svg class={style['svg-pyramid']} width="100%" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <polygon points="40,10 50,10 45,0 45,0" fill="rgb(66,60,43)"/>
        <text x="5" y="5" text-anchor="start" font-size="2">&gt; $500M</text>
        <text x="45" y="6" text-anchor="middle" class={style['adults']}>7,016</text>
        <text x="45" y="9" text-anchor="middle" class={style['percentage']}>0.00013%</text>
        <text x="85" y="5" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${19.17913732}`} hash='bitcoin'>
            {f.satsDecimal(19.17913732)}
          </Link>
        </text>

        <polygon points="35,20 55,20 50,10 40,10" fill="rgb(78,72,55)"/>
        <text x="5" y="15" text-anchor="start" font-size="2">&gt; $100M</text>
        <text x="45" y="15" text-anchor="middle" class={style['adults']}>72,474</text>
        <text x="45" y="18" text-anchor="middle" class={style['percentage']}>0.00135%</text>
        <text x="85" y="15" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${3.83582746}`} hash='bitcoin'>
            {f.satsDecimal(3.83582746)}
          </Link>
        </text>

        <polygon points="30,30 60,30 55,20 35,20" fill="rgb(90,84,67)"/>
        <text x="5" y="25" text-anchor="start" font-size="2">&gt; $50M</text>
        <text x="45" y="25" text-anchor="middle" class={style['adults']}>163,572</text>
        <text x="45" y="28" text-anchor="middle" class={style['percentage']}>0.003%</text>
        <text x="85" y="25" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${1.91791373}`} hash='bitcoin'>
            {f.satsDecimal(1.91791373)}
          </Link>
        </text>

        <polygon points="25,40 65,40 60,30 30,30" fill="rgb(102,96,79)"/>
        <text x="5" y="35" text-anchor="start" font-size="2">&gt; $10M</text>
        <text x="45" y="35" text-anchor="middle" class={style['adults']}>2.5 M</text>
        <text x="45" y="38" text-anchor="middle" class={style['percentage']}>0.05%</text>
        <text x="85" y="35" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${0.38358275}`} hash='bitcoin'>
            {f.satsDecimal(0.38358275)}
          </Link>
        </text>

        <polygon points="20,50 70,50 65,40 25,40" fill="rgb(114,108,91)"/>
        <text x="5" y="45" text-anchor="start" font-size="2">&gt; $5m</text>
        <text x="45" y="45" text-anchor="middle" class={style['adults']}>5 M</text>
        <text x="45" y="48" text-anchor="middle" class={style['percentage']}>0.09%</text>
        <text x="85" y="45" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${0.19179137}`} hash='bitcoin'>
            {f.satsDecimal(0.19179137)}
          </Link>
        </text>

        <polygon points="15,60 75,60 70,50 20,50" fill="rgb(126,120,103)"/>
        <text x="5" y="55" text-anchor="start" font-size="2">&gt; $1M</text>
        <text x="45" y="55" text-anchor="middle" class={style['adults']}>51.5 M</text>
        <text x="45" y="58" text-anchor="middle" class={style['percentage']}>0.96%</text>
        <text x="85" y="55" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${0.03835827}`} hash='bitcoin'>
            {f.satsDecimal(0.03835827)}
          </Link>
        </text>

        <polygon points="10,70 80,70 75,60 15,60" fill="rgb(138,132,115)"/>
        <text x="5" y="65" text-anchor="start" font-size="2">&gt; $100K</text>
        <text x="45" y="65" text-anchor="middle" class={style['adults']}>642 M</text>
        <text x="45" y="68" text-anchor="middle" class={style['percentage']}>12%</text>
        <text x="85" y="65" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${0.00383583}`} hash='bitcoin'>
            {f.satsDecimal(0.00383583)}
          </Link>
        </text>

        <polygon points="5,80 85,80 80,70 10,70" fill="rgb(150,144,127)"/>
        <text x="5" y="75" text-anchor="start" font-size="2">&gt; $10,000</text>
        <text x="45" y="75" text-anchor="middle" class={style['adults']}>1.8 B</text>
        <text x="45" y="78" text-anchor="middle" class={style['percentage']}>34%</text>
        <text x="85" y="75" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${0.00038358}`} hash='bitcoin'>
            {f.satsDecimal(0.00038358)}
          </Link>
        </text>

        <polygon points="0,90 90,90 85,80 5,80" fill="rgb(162,156,139)"/>
        <text x="5" y="85" text-anchor="start" font-size="2">&lt; $10,000</text>
        <text x="45" y="85" text-anchor="middle" class={style['adults']}>2.8 B</text>
        <text x="45" y="88" text-anchor="middle" class={style['percentage']}>53%</text>
        <text x="85" y="85" text-anchor="end" font-size="2">
          &lt;&nbsp;
          <Link queryParams={`btc=${0.00038358}`} hash='bitcoin'>
            {f.satsDecimal(0.00038358)}
          </Link>
        </text>
      </svg>

      <table class="table-fixed w-full my-4 text-gray-400">
        <tr>
          <td class="text-left pl-4">
            wealth measured in USD
          </td>
          <td class="text-center">
            number of adults
          </td>
          <td class="text-right pr-4">
            equivalent wealth in BTC
          </td>
        </tr>
      </table>
    </div>
    );
  }
}
