import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/market.css';

class Cryptocurrencies extends Component {
  state = {};

  componentWillMount() {
    fetch('https://api.coinmarketcap.com/v1/ticker/').then(response => {
      return response.json();
    }).then(cryptocurrencies => {
      this.setState({cryptocurrencies:cryptocurrencies});
    });
  }

  renderCryptocurrencies() {
    let cryptocurrencies = this.state.cryptocurrencies;
    if (!cryptocurrencies) {
      console.log('Loading');
    } else {
      return(
        cryptocurrencies.map(cryptocurrency =>
          <tr key={cryptocurrency.id}>
            <td>{cryptocurrency.rank}</td>
            <td><Link to={`/market/${cryptocurrency.id}`}>{cryptocurrency.name}</Link></td>
            <td>${cryptocurrency.market_cap_usd}</td>
            <td>${cryptocurrency.price_usd}</td>
            <td>{cryptocurrency.total_supply}</td>
            <td>${cryptocurrency['24h_volume_usd']}</td>
            <td>{cryptocurrency.percent_change_24h}%</td>
          </tr>
        )
      )
    }
  }

  render() {
    return(
      <div className='cryptocurrencies'>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Supply</th>
              <th>24hr Volume</th>
              <th>24hr %Change</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCryptocurrencies()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Cryptocurrencies;
