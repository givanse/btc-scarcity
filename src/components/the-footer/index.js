import {h, Component } from 'preact';
import style from './style';

export default class TheFooter extends Component {

  render() {

    return (
      <footer class={style['footer']}>
        <br />
        <a class="text-gray-800 text-3xl" href="https://github.com/givanse/btc-scarcity"
           aria-label="check out the source code repository">
          <i class="icon-github"></i>
        </a>
      </footer>
    );
  }

}
