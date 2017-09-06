import React from 'react';
import { Link } from 'react-router-dom';
import '../css/market.css';

import Cryptocurrencies from '../components/cryptocurrencies';

export default class Markets extends React.Component {
  render() {
    return(
      <div className='market'>
        <Link to='/'><h2>MARKETS</h2></Link>
        <Cryptocurrencies />
      </div>
    )
  }
}
