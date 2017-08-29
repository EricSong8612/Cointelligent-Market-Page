import React from 'react';
import '../css/market.css';

import ExchangeList from '../components/exchange_list';
import ExchangeDetail from '../components/exchange_detail';

export default class Markets extends React.Component {
  render() {
    return(
      <div className='market'>
        <h2>MARKETS</h2>
        <ExchangeList />
        <ExchangeDetail />
        <div className='clear'></div>
      </div>
    )
  }
}
