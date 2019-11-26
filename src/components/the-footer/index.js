import {h, Component } from 'preact';
import style from './style';

export default class TheFooter extends Component {

  render() {

    return (
      <footer class="background-btc-orange">
        <a class="font-bold text-white text-2xl"
           href="https://bitcoin.org/en/faq#is-bitcoin-really-used-by-people">
          Is Bitcoin really used by people?
        </a>
      </footer>
    );
  }

}
