import {h, Component } from 'preact';
import style from './style';

export default class TheFooter extends Component {

  render() {

    return (
      <header class={style['header']}>

        <a href="#world" class={style['link'] + ' bg-blue-600'}
           aria-label="bitcoin per person">
          <i class="icon-person"></i>
        </a>

        <a href="#cash" class={`${style['link']} background-money`}
           aria-label="compare potential fiat purchases">
          <i class="icon-dollar"></i>
        </a>

        <a href="#bitcoin" class={style['link'] + ' background-btc-orange text-black'}
           aria-label="compare bitcoin hold amounts">
          <i class="icon-bitcoin"></i>
        </a>

        <a href="#supply" class={style['link'] + ' bg-purple-600'}
           aria-label="assets supply comparisons">
          <i class="icon-chart-pie"></i>
        </a>

      </header>
    );
  }

}
