export function selectExchange(exchange) {
  return {
    type: 'EXCHANGE_SELECTED',
    payload: exchange
  }
}
