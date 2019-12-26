import { getSats } from '../../utils/bitcoin-math';
import f from '../../utils/formatter';

const SAT_SIGN = ' sat';

//TODO: bad file name, bad function name

function btc(btcAmount) {
  const {btc, sats} = getSats(btcAmount);
  
  let btcString = `${f.whole(sats)}${SAT_SIGN}`;

  if (btc) {
    btcString = `₿${f.whole(btc)} and ${btcString}`;
  }

  return (
    <div>
        {btcString}
    </div>
  );
}

export default { btc }
