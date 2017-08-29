import { combineReducers } from 'redux';
import ExchangesReducer from './reducer_exchanges';
import ActiveExchange from './reducer_active_exchange';

const rootReducer = combineReducers({
  //state: (state = {}) => state
  exchanges: ExchangesReducer,
  activeExchange: ActiveExchange
});

export default rootReducer;
