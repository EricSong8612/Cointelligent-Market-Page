export default function(
  state = {
    name:'GDAX',
    performers:['BTC/USD0', 'BTC/AUD0', 'ETH/USD0', 'ETH/AUD0']
  }, action) {
  switch (action.type) {
    case 'EXCHANGE_SELECTED':
      return action.payload;
      break;
  }
  return state
}
