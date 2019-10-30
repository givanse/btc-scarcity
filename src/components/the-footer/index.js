import {h, Component } from 'preact';
import style from './style';

export default class TheFooter extends Component {

	render() {

    return (
      <footer class="h-32 bg-orange-400 text-center p-4 pt-12 mt-8">
				<a class="underline font-bold"
				   href="https://bitcoin.org/en/faq#is-bitcoin-really-used-by-people">
				  Is Bitcoin really used by people?
				</a>
      </footer>
		);
	}

}
