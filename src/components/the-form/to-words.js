import getSats from '../../utils/get-sats';
import f from './formatter';

const SAT_SIGN = ' sat';

//TODO: bad file name, bad function name

function btc(btcAmount) {
  const {btc, sats} = getSats(btcAmount);
  
  let btcString = `${f.btc(sats)}${SAT_SIGN}`;

  if (btc) {
    btcString = `₿${f.btc(btc)} and ${btcString}`;
  }

  return (
    <div>
        {btcString}
    </div>
  );
}

export default { btc }
