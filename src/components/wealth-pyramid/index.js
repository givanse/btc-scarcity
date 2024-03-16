import {h, Component } from 'preact';
import style from './style';
import f from '../../utils/formatter';
import Link from '../link';
import staticData from '../../utils/static-data';
import { Text } from 'preact-i18n';

const {pyramid} = staticData;

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
        <Text id="wealth-pyramid.global-wealth">
          global wealth
        </Text>
      </p>

      <table class="table-fixed w-full text-center my-4 text-gray-700">
        <tr>
          <td>
            <i class="icon-money text-3xl"></i>
          </td>
          <td>
            <i class="icon-person text-4xl"></i>
          </td>
          <td>
            <i class="icon-bitcoin text-3xl"></i>
          </td>
        </tr>
      </table>

      <svg class={style['svg-pyramid']} width="100%" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <polygon points="40,10 50,10 45,0 45,0" fill="rgb(66,60,43)"/>
        <text x="5" y="5" text-anchor="start" font-size="2">
          &gt; ${pyramid[8].wealth.usd/staticData.UNITS.MILLION}M</text>
        <text x="45" y="5" text-anchor="middle" class={style['percentage']}>
          top {pyramid[8].topPercent.toFixed(4)}%</text>
        <text x="45" y="8.5" text-anchor="middle" class={style['adults']}>
          {f.dec(pyramid[8].adults)}</text>
        <text x="85" y="5" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${pyramid[8].wealth.btc.toFixed(8)}`} hash='bitcoin'>
            {pyramid[8].wealth.btc.toFixed(1)}
          </Link>
        </text>

        <polygon points="35,20 55,20 50,10 40,10" fill="rgb(78,72,55)"/>
        <text x="5" y="15" text-anchor="start" font-size="2">
          &gt; ${pyramid[7].wealth.usd/staticData.UNITS.MILLION}M</text>
        <text x="45" y="15" text-anchor="middle" class={style['percentage']}>
          top {pyramid[7].topPercent.toFixed(3)}%</text>
        <text x="45" y="18.5" text-anchor="middle" class={style['adults']}>
          {f.dec(pyramid[7].adults)}</text>
        <text x="85" y="15" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${pyramid[7].wealth.btc.toFixed(8)}`} hash='bitcoin'>
            {pyramid[7].wealth.btc.toFixed(1)}
          </Link>
        </text>

        <polygon points="30,30 60,30 55,20 35,20" fill="rgb(90,84,67)"/>
        <text x="5" y="25" text-anchor="start" font-size="2">
          &gt; ${pyramid[6].wealth.usd/staticData.UNITS.MILLION}M</text>
        <text x="45" y="25" text-anchor="middle" class={style['percentage']}>
          top {pyramid[6].topPercent.toFixed(3)}%</text>
        <text x="45" y="28.5" text-anchor="middle" class={style['adults']}>
          {f.dec(pyramid[6].adults)}</text>
        <text x="85" y="25" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${pyramid[6].wealth.btc.toFixed(8)}`} hash='bitcoin'>
            {pyramid[6].wealth.btc.toFixed(2)}
          </Link>
        </text>

        <polygon points="25,40 65,40 60,30 30,30" fill="rgb(102,96,79)"/>
        <text x="5" y="35" text-anchor="start" font-size="2">
          &gt; ${pyramid[5].wealth.usd/staticData.UNITS.MILLION}M</text>
        <text x="45" y="35" text-anchor="middle" class={style['percentage']}>
          top {pyramid[5].topPercent.toFixed(2)}%</text>
        <text x="45" y="38.5" text-anchor="middle" class={style['adults']}>
          {(pyramid[5].adults/staticData.UNITS.MILLION).toFixed(1)}M</text>
        <text x="85" y="35" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${pyramid[5].wealth.btc.toFixed(8)}`} hash='bitcoin'>
            {pyramid[5].wealth.btc.toFixed(2)}
          </Link>
        </text>

        <polygon points="20,50 70,50 65,40 25,40" fill="rgb(114,108,91)"/>
        <text x="5" y="45" text-anchor="start" font-size="2">
          &gt; ${pyramid[4].wealth.usd/staticData.UNITS.MILLION}M</text>
        <text x="45" y="45" text-anchor="middle" class={style['percentage']}>
          top {pyramid[4].topPercent.toFixed(2)}%</text>
        <text x="45" y="48.5" text-anchor="middle" class={style['adults']}>
          {(pyramid[4].adults/staticData.UNITS.MILLION).toFixed(0)}M</text>
        <text x="85" y="45" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${pyramid[4].wealth.btc.toFixed(8)}`} hash='bitcoin'>
            {pyramid[4].wealth.btc.toFixed(2)}
          </Link>
        </text>

        <polygon points="15,60 75,60 70,50 20,50" fill="rgb(126,120,103)"/>
        <text x="5" y="55" text-anchor="start" font-size="2">
          &gt; ${pyramid[3].wealth.usd/staticData.UNITS.MILLION}M</text>
        <text x="45" y="55" text-anchor="middle" class={style['percentage']}>
          top {pyramid[3].topPercent.toFixed(2)}%</text>
        <text x="45" y="58.5" text-anchor="middle" class={style['adults']}>
          {(pyramid[3].adults/staticData.UNITS.MILLION).toFixed(0)}M</text>
        <text x="85" y="55" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${pyramid[3].wealth.btc.toFixed(8)}`} hash='bitcoin'>
            {f.satsDecimal(pyramid[3].wealth.btc, 4)}
          </Link>
        </text>

        <polygon points="10,70 80,70 75,60 15,60" fill="rgb(138,132,115)"/>
        <text x="5" y="65" text-anchor="start" font-size="2">
          &gt; ${pyramid[2].wealth.usd/staticData.UNITS.KILO}K</text>
        <text x="45" y="65" text-anchor="middle" class={style['percentage']}>
          top {pyramid[2].topPercent.toFixed(0)}%</text>
        <text x="45" y="68.5" text-anchor="middle" class={style['adults']}>
          {(pyramid[2].adults/staticData.UNITS.MILLION).toFixed(0)}M</text>
        <text x="85" y="65" text-anchor="end" font-size="2">
          &gt;&nbsp;
          <Link queryParams={`btc=${pyramid[2].wealth.btc.toFixed(8)}`} hash='bitcoin'>
            {f.satsDecimal(pyramid[2].wealth.btc, 4)}
          </Link>
        </text>

        <g class={style['level-8']}>
          <polygon points="5,80 85,80 80,70 10,70" fill="rgb(150,144,127)"/>
          <text x="5" y="75" text-anchor="start" font-size="2">
            &gt; ${pyramid[1].wealth.usd/staticData.UNITS.KILO}K</text>
          <text x="45" y="75" text-anchor="middle" class={style['percentage']}>
            top {pyramid[1].topPercent.toFixed(0)}%</text>
          <text x="45" y="78.5" text-anchor="middle" class={style['adults']}>
            {(pyramid[1].adults/staticData.UNITS.USA_BILLION).toFixed(1)}B</text>
          <text x="85" y="75" text-anchor="end" font-size="2">
            &gt;&nbsp;
            <Link queryParams={`btc=${pyramid[1].wealth.btc.toFixed(8)}`} hash='bitcoin'>
              {f.satsDecimal(pyramid[1].wealth.btc, 4)}
            </Link>
          </text>
        </g>

        <g class={style['level-9']}>
          <polygon points="0,90 90,90 85,80 5,80" fill="rgb(162,156,139)"/>
          <text x="5" y="86.5" text-anchor="start" font-size="2">
            &lt; ${pyramid[0].wealth.usd/staticData.UNITS.KILO}K</text>
          <text x="45" y="86.5" text-anchor="middle" class={style['adults']} fill="black">
            {(pyramid[0].adults/staticData.UNITS.USA_BILLION).toFixed(1)}B</text>
          <text x="85" y="86.5" text-anchor="end" font-size="2">
            &lt;&nbsp;
            <Link queryParams={`btc=${pyramid[0].wealth.btc.toFixed(8)}`} hash='bitcoin'>
              {f.satsDecimal(pyramid[0].wealth.btc, 4)}
            </Link>
          </text>
        </g>
      </svg>

      <table class="table-fixed w-full my-4 text-gray-400">
        <tr>
          <td class="text-left pl-10">
            USD
          </td>
          <td class="text-center">
            number of adults
          </td>
          <td class="text-right pr-10">
            BTC
          </td>
        </tr>
      </table>

      <p class="mx-auto mt-16 w-11/12 font-serif">
        To be in the top {pyramid[2].topPercent.toFixed(0)}%
        of net worth requires at least
        &nbsp;
        {f.usd(pyramid[2].wealth.usd)}
        &nbsp;
        Proportionaly in Bitcoin, that's
        &nbsp;
        <Link queryParams={`btc=${pyramid[2].wealth.btc.toFixed(8)}`} hash='bitcoin' classNames='btc'>
          {f.satsDecimal(pyramid[2].wealth.btc)}
        </Link>
      </p>

      <p class="mx-auto mt-8 w-11/12 font-serif">
        To roll with the top
        &nbsp;
        {pyramid[3].topPercent.toFixed(2)}%
        in net worth, aim for at least
        &nbsp;
        {f.usd(pyramid[3].wealth.usd)}
        &nbsp;
        Correspondingly in Bitcoin, that's about
        &nbsp;
        <Link queryParams={`btc=${pyramid[3].wealth.btc.toFixed(8)}`} hash='bitcoin' classNames='btc'>
          {f.satsDecimal(pyramid[3].wealth.btc)}
        </Link>
      </p>
    </div>
    );
  }
}
