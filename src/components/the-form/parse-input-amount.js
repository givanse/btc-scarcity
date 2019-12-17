
export default function parseInputAmount(value) {
  value = value.replace(/[^0-9.]/g,'');
  const float = Number.parseFloat(value);

  return Number.isNaN(float) ? 0 : float;
}