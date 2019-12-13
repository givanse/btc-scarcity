import {h, Component } from 'preact';
import style from './style';

export default class TheFooter extends Component {

  render() {

    return (
      <footer class={style['footer']}>
        <a class="font-bold text-2xl"
           href="https://bitcoin.org/en/faq#is-bitcoin-really-used-by-people">
          Is Bitcoin really used by people?
        </a>
        <br />
        <br />
        <br />
        <a class="text-gray-800 text-3xl" href="https://github.com/givanse/btc-scarcity"
           aria-label="check out the source code repository">
          <i class="icon-github"></i>
        </a>
      </footer>
    );
  }

}
