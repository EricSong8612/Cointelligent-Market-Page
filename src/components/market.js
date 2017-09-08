import React from 'react';
import { Link } from 'react-router-dom';
import '../css/market.css';

import Cryptocurrencies from '../components/cryptocurrencies';

export default class Markets extends React.Component {
  render() {
    return(
      <div className='market'>
        <h2><Link to='/'>MARKETS</Link></h2>
        <Cryptocurrencies />
      </div>
    )
  }
}
