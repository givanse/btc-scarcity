import {h, Component } from 'preact';
import style from './style';
import { Text } from 'preact-i18n';
import InputFiat from '../input-fiat';

export default class TheFooter extends Component {

  render() {

    const {
      onFiatPurchase,
      updateFiatPurchase,
      fiatPurchase,
      btcBought,
      btcPrice,
    } = this.props;

    return (
      <div>

      <div id="cash" class="block pt-4">
        <a href="#cash" class="cursor-pointer">
          <h2 class="background-money text-white">
            <Text id="cash.title">Cash</Text>
          </h2>
        </a>
      </div>

      <p class="text-center mb-4">
        <Text id="cash.description">
          What's my bitcoin haul for this cash?
        </Text>
      </p>

      <InputFiat name="fiat-purchase"
                 fiatPurchase={fiatPurchase}
                 updateFiatPurchase={onFiatPurchase}
                 updateValue={updateFiatPurchase}
                 btcBought={btcBought}
                 btcPrice={btcPrice} />
      </div>
    );
  }

}
