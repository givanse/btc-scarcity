import {h, Component } from 'preact';
import style from './style';

export default class Link extends Component {

  render() {
    const {queryParams, hash} = this.props;

    let href = `?${queryParams}`;

    href += hash ? `#${hash}` : '';

    const classNames = `${this.props.classNames} underline`;

    return (
      <a href={href} class={classNames} data-navigate>
        {this.props.children}
      </a>
    );
  }

}
