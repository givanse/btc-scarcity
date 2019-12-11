import {h, Component } from 'preact';
import style from './style';
import staticData from '../the-form/static-data';
import f from '../the-form/formatter';

const {
  btcPercOfRemainTSupply,
  fiatPercOfBroadMoney,
  fiatPercOfGold,
  buyGoldOunces,
} = staticData; 

function log10(num) {
  const offset = 1.000000000050; // avoid negative numbers
  return Math.log10(num + offset);
}

function magnitude(num) {
  return -Math.floor(Math.log(num) / Math.log(10));
}

function pixelsRuleOfThree(min, x) {
  const minPixels = 1;
  const px = (x * minPixels) / min;
  return px;
}

export default class LogBarChart extends Component {

  drawColumnText(ctx, colX, colY, colWidth, textArr) {
    ctx.font = '12px monospace';
    ctx.fillStyle = 'black';

    const lineHeight = 18;

    let text = textArr[0]; 
    let textWidth = ctx.measureText(text).width;
    let xText = colX + (colWidth / 2) - (textWidth / 2);
    ctx.fillText(text, xText , colY - 75 - lineHeight);

    text = textArr[1];
    textWidth = ctx.measureText(text).width;
    xText = colX + (colWidth / 2) - (textWidth / 2);
    ctx.fillText(text, xText, colY - 75);

    text = textArr[2]; 
    textWidth = ctx.measureText(text).width;
    xText = colX + (colWidth / 2) - (textWidth / 2);
    ctx.fillText(text, xText, colY + lineHeight);
  }

  drawBars(ctx, canvas) {
    const fiatPurchase = this.props.fiatPurchase;
    const goldBoughtOz = buyGoldOunces(fiatPurchase);
    const btcBought = this.props.btcBought;

    // percentages
    const broadMoneyPerc = fiatPercOfBroadMoney(fiatPurchase);
    const goldPerc = fiatPercOfGold(fiatPurchase);
    const btcPerc = btcPercOfRemainTSupply(btcBought);

    // logarithmic values
    const broadMoneyLog = log10(broadMoneyPerc); 
    const goldLog = log10(goldPerc);
    const btcLog = log10(btcPerc);

    // min & max
    const magnitudes = [
      magnitude(broadMoneyLog),
      magnitude(goldLog),
      magnitude(btcLog),
    ];
    let avgMag = magnitudes.reduce((acc, n) => acc + n, 0) / magnitudes.length;
    const maxLog = Math.max(broadMoneyLog, goldLog, btcLog);
    let oneHundredPercHeight = Math.pow(10, avgMag);
    oneHundredPercHeight = oneHundredPercHeight < 600 ? 600 : oneHundredPercHeight;
    const maxHeight = oneHundredPercHeight * maxLog;
    console.log(magnitudes);
    console.log('mag 100% maxH', avgMag, oneHundredPercHeight, maxHeight);

    const barSpace = 30;
    const barWidth = 125;
    const y = maxHeight > 250 ? maxHeight + 15 : 300;
    
    // set canvas dimensions
    const bottomAxis = 30;
    canvas.height = y + bottomAxis;
    const maxWidth = canvas.parentElement.getBoundingClientRect().width - 6;
    canvas.style.maxWidth = `${maxWidth}px`;

    // background
    ctx.fillStyle = '#f6f6f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#e5e5e5';
    ctx.fillRect(0, y, canvas.width, bottomAxis);

    let x = 10;
    let barHeight = oneHundredPercHeight * broadMoneyLog; 
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, barWidth, -barHeight);

    this.drawColumnText(ctx, x, y, barWidth, [
      f.usd(fiatPurchase),
      f.per(broadMoneyPerc),
      'money'
    ]);

    x += barSpace + barWidth;
    barHeight = oneHundredPercHeight * goldLog;
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(x, y, barWidth, -barHeight);

    this.drawColumnText(ctx, x, y, barWidth, [
      f.dec(goldBoughtOz) + ' oz',
      f.per(goldPerc),
      'gold',
    ]);

    x += barSpace + barWidth;
    ctx.fillStyle = '#f79319';
    barHeight = oneHundredPercHeight * btcLog; 
    ctx.fillRect(x, y, barWidth, -barHeight);

    this.drawColumnText(ctx, x, y, barWidth, [
      '₿ ' + f.sat(btcBought),
      f.per(btcPerc),
      'bitcoin',
    ]);
  }

  componentDidUpdate() {
    const canvas = this.base.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    this.drawBars(ctx, canvas);
  }

  render() {
    const fiatPurchase = this.props.fiatPurchase;
    const btcBought = this.props.btcBought;

    const broadMoneyPerc = fiatPercOfBroadMoney(fiatPurchase);
    const goldPerc = fiatPercOfGold(fiatPurchase);
    const btcPerc = btcPercOfRemainTSupply(btcBought);

    return (
      <div class="text-center">
        <canvas id="log-bar-chart" class="m-auto" width="460" height="400">
          broad money {f.per(broadMoneyPerc)}
          <br />
          gold {f.per(goldPerc)}
          <br />
          btc {f.per(btcPerc)}
        </canvas>
      </div>
    );
  }

}
