import {h, Component } from 'preact';
import style from './style';

export default class Link extends Component {

  render() {
    const {queryParams, hash} = this.props;

    let href = `?${queryParams}`;

    href += hash ? `#${hash}` : '';

    return (
      <a href={href} class="underline" data-navigate>
        {this.props.children}
      </a>
    );
  }

}
