import React from 'react';
import '../css/market.css';

import Cryptocurrencies from '../components/cryptocurrencies';

export default class Markets extends React.Component {
  render() {
    return(
      <div className='market'>
        <h2>MARKETS</h2>
        <Cryptocurrencies />
      </div>
    )
  }
}
