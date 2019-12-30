import {h, Component } from 'preact';
import style from './style';
import staticData from '../../utils/static-data';
import f from '../../utils/formatter';

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

const LINE_HEIGHT = 18;

export default class LogBarChart extends Component {

  drawColumnText(ctx, colX, colY, colWidth, textArr) {
    ctx.fillStyle = 'black';

    ctx.font = 'bold 13px monospace';
    let text = textArr[0]; 
    let textWidth = ctx.measureText(text).width;
    let xText = colX + (colWidth / 2) - (textWidth / 2);
    ctx.fillText(text, xText , colY - 75 - LINE_HEIGHT);

    ctx.font = '12px monospace';
    text = textArr[1];
    textWidth = ctx.measureText(text).width;
    xText = colX + (colWidth / 2) - (textWidth / 2);
    ctx.fillText(text, xText, colY - 75);

    // Column label
    text = textArr[2]; 
    textWidth = ctx.measureText(text).width;
    xText = colX + (colWidth / 2) - (textWidth / 2);
    ctx.fillText(text, xText, colY + LINE_HEIGHT);
    ctx.fillText(text, xText, LINE_HEIGHT * 4);
  }

  drawBars(ctx, canvas, goldPrice) {
    const fiatPurchase = this.props.fiatPurchase;
    const goldBoughtOz = buyGoldOunces(fiatPurchase, goldPrice);
    const btcBought = this.props.btcBought;

    // percentages
    const broadMoneyPerc = fiatPercOfBroadMoney(fiatPurchase);
    const goldPerc = fiatPercOfGold(fiatPurchase, goldPrice);
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

    const barSpace = 30;
    const barWidth = 125;
    const minHeight = 400;
    const y = maxHeight > minHeight ? maxHeight + 10 : minHeight;
    
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

    // Draw columns

    // Broad money
    let x = 10;
    let barHeight = oneHundredPercHeight * broadMoneyLog; 
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, barWidth, -barHeight);

    this.drawColumnText(ctx, x, y, barWidth, [
      f.per(broadMoneyPerc),
      f.usd(fiatPurchase),
      'broad money'
    ]);

    // Gold

    x += barSpace + barWidth;
    barHeight = oneHundredPercHeight * goldLog;
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(x, y, barWidth, -barHeight);

    this.drawColumnText(ctx, x, y, barWidth, [
      f.per(goldPerc),
      f.dec(goldBoughtOz) + ' oz',
      'mined gold',
    ]);

    // Bitcoin

    x += barSpace + barWidth;
    ctx.fillStyle = '#f79319';
    barHeight = oneHundredPercHeight * btcLog; 
    ctx.fillRect(x, y, barWidth, -barHeight);

    this.drawColumnText(ctx, x, y, barWidth, [
      f.per(btcPerc),
      '₿ ' + f.btc(btcBought),
      'bitcoin supply',
    ]);

    // Chart header 
    ctx.font = '14px arial';
    let text = 'Dollar Purchasing Power Comparison'; 
    let textWidth = ctx.measureText(text).width;
    const canvasW = canvas.width;
    let xText = (canvasW / 2) - (textWidth / 2);
    let yText = LINE_HEIGHT * 1.5;
    ctx.fillText(text, xText, yText);

    ctx.font = '12px arial';
    text = '(log scale)'; 
    textWidth = ctx.measureText(text).width;
    xText = (canvasW / 2) - (textWidth / 2);
    ctx.fillText(text, xText, yText + LINE_HEIGHT);
  }

  componentDidUpdate() {
    const canvas = this.base.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const { goldPrice } = this.props;
    this.drawBars(ctx, canvas, goldPrice);
  }

  render() {
    const {fiatPurchase, btcBought, goldPrice} = this.props;

    const broadMoneyPerc = fiatPercOfBroadMoney(fiatPurchase);
    const goldPerc = fiatPercOfGold(fiatPurchase, goldPrice);
    const btcPerc = btcPercOfRemainTSupply(btcBought);

    return (
      <div class="text-center">
        <canvas id="log-bar-chart" class="m-auto" width="440" height="250">
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
