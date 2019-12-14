import { h } from 'preact';
import style from './style';
import TheForm from '../../components/the-form';
import TheFooter from '../../components/the-footer';

const Home = (props) => (
  <div>
    <TheForm>
      {props.children}
    </TheForm>
    <TheFooter />
  </div>
);

export default Home;
