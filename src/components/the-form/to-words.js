import getSats from './get-sats';
import f from './formatter';
import {
  btcToWords,
} from './words';

const SAT_SIGN = 's';

function btc(btcAmount) {
  const {btc, sats} = getSats(btcAmount);
  
  let s = `${f.btc(sats)}${SAT_SIGN}`;

  if (btc) {
    s = `₿${f.btc(btc)} and ${s}`;
  }
  
  return (
    <div>
      {s}
      <p class="text-sm text-gray-700">
        {btcToWords(btcAmount)}
      </p>
    </div>
  );
}

export default { btc }