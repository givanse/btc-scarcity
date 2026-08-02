/** @jsx h */
import {h, Component } from 'preact';
import style from './style.module.css';

export default class TheFooter extends Component {

  render() {

    return (
      <footer class={style['footer']}>
        <a href="https://github.com/givanse/btc-scarcity"
           aria-label="check out the source code repository">
          <i class="icon-github"></i>
        </a>
        <a href="https://twitter.com/gaston_this_is"
           aria-label="author's twitter account">
          <i class="icon-twitter"></i>
        </a>
      </footer>
    );
  }

}
