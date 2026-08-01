/** @jsx h */
import { h } from 'preact';
import TheForm from '../../components/the-form';
import TheFooter from '../../components/the-footer';

const Home = (props) => (
  <div>
    <TheForm btcHodl={props.btcHodl}
             btcPrice={props.btcPrice}
             fiatPurchase={props.fiatPurchase}
             updateBtcHodl={props.updateBtcHodl}
             updateFiatPurchase={props.updateFiatPurchase} >
      {props.children}
    </TheForm>
    <TheFooter />
  </div>
);

export default Home;
