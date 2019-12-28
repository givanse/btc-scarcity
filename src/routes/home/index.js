import { h } from 'preact';
import style from './style';
import TheForm from '../../components/the-form';
import TheFooter from '../../components/the-footer';

const Home = (props) => (
  <div>
    <TheForm btcHodl={props.btcHodl}
             btcPrice={props.btcPrice}
             goldPrice={props.goldPrice}
             fiatPurchase={props.fiatPurchase}
             updateBtcHodl={props.updateBtcHodl}
             updateFiatPurchase={props.updateFiatPurchase} >
      {props.children}
    </TheForm>
    <TheFooter />
  </div>
);

export default Home;
