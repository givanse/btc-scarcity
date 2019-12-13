import getSats from './get-sats';
import f from './formatter';
import {
  btcToWords,
} from './words';

const SAT_SIGN = ' sat';

function btc(btcAmount) {
  const {btc, sats} = getSats(btcAmount);
  
  let btcString = `${f.btc(sats)}${SAT_SIGN}`;

  if (btc) {
    btcString = `₿${f.btc(btc)} and ${btcString}`;
  }

  //const href = `?btc=${btcAmount.toFixed(8)}#bitcoin`;

  return (
    <div>
      {btcString}
      <p class="text-sm text-gray-700">
        {btcToWords(btcAmount)}
      </p>
    </div>
  );
}

export default { btc }