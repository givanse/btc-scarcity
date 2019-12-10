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

function magnitud(num) {
  return -Math.floor( Math.log(num) / Math.log(10) + 1);
}

export default class LogBarChart extends Component {

  drawBars(ctx, canvas) {
    const fiatPurchase = this.props.fiatPurchase;
    const goldBoughtOz = buyGoldOunces(fiatPurchase);
    const btcBought = this.props.btcBought;

    // percentages
    const broadMoneyPerc = fiatPercOfBroadMoney(fiatPurchase);
    const goldPerc = fiatPercOfGold(fiatPurchase);
    const btcPerc = btcPercOfRemainTSupply(btcBought);

    // logarithmic values
    const broadMoney = log10(broadMoneyPerc); 
    const gold = log10(goldPerc);
    const btc = log10(btcPerc);

    // calc multiplier
    const min = Math.min(broadMoney, gold, btc);
    const mag = magnitud(min);
    console.log('min mag', min, mag);
    let multiplier;
    switch(mag) {
      case 6: case 5:
        multiplier = Math.pow(10, 6); break;
      case 7:
        multiplier = Math.pow(10, 7); break;
      case 8:
        multiplier = Math.pow(10, 7.6); break;
      case 9:
        multiplier = Math.pow(10, 9.2); break;
      case 10:
        multiplier = Math.pow(10, 11); break;
      default:
        multiplier = Math.pow(10, mag); break;
    }

    const max = Math.max(broadMoney, gold, btc);
    const maxHeight = max * multiplier;

    const barSpace = 30;
    const barWidth = 125;
    const y = maxHeight > 250 ? maxHeight + 15 : 300;
    const lineHeight = 15;
    
    // set canvas dimensions
    canvas.height = y + 20;

    // grid & background
    ctx.strokeStyle = '#dbdbdb';
    ctx.moveTo(0, y + 1);
    ctx.lineTo(canvas.width, y + 1);
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#f6f6f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // text params
    ctx.font = '12px monospace';
    const xTextPadding = 7;  
    const yText = y - 75;

    let x = 10;
    let barHeight = broadMoneyPerc * multiplier;
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, barWidth, -barHeight);
    ctx.fillStyle = 'black';
    let text = f.usd(fiatPurchase);
    ctx.fillText(text, x + xTextPadding, yText - lineHeight);
    text = f.per(broadMoneyPerc);
    ctx.fillText(text, x + xTextPadding, yText);
    ctx.fillText('money', x + xTextPadding, y + lineHeight);

    x += barSpace + barWidth;
    ctx.fillStyle = '#D4AF37';
    barHeight = gold * multiplier;
    ctx.fillRect(x, y, barWidth, -barHeight);
    ctx.fillStyle = 'black';
    text = f.dec(goldBoughtOz) + 'oz';
    ctx.fillText(text, x + xTextPadding, yText - lineHeight);
    text = f.per(goldPerc);
    ctx.fillText(text, x + xTextPadding, yText);
    ctx.fillText('gold', x + xTextPadding, y + lineHeight);

    x += barSpace + barWidth;
    ctx.fillStyle = '#f79319';
    barHeight = btc * multiplier;
    ctx.fillRect(x, y, barWidth, -barHeight);
    ctx.fillStyle = 'black';
    text = '₿' + f.sat(btcBought);
    ctx.fillText(text, x + xTextPadding, yText - lineHeight);
    text = f.per(btcPerc);
    ctx.fillText(text, x + xTextPadding, yText);
    ctx.fillText('bitcoin', x + xTextPadding, y + lineHeight);
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
