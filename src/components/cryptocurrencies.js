import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/market.css';

class Cryptocurrencies extends Component {
  state = {};

  componentWillMount() {
    // fetch('https://api.coinmarketcap.com/v1/ticker/?limit=100').then(response => {
    //   return response.json();
    // }).then(cryptocurrencies => {
    //   this.setState({cryptocurrencies:cryptocurrencies});
    // });

    fetch('https://cointelligent-api.herokuapp.com/api/assets').then(response => {
      return response.json();
    }).then(currencies => {
      // console.log(currencies);
      let cryptocurrencies = [];
      let dataObj = currencies.data;
      for (let currency in dataObj) {
        cryptocurrencies.push(dataObj[currency]);
      };
      cryptocurrencies.sort(function(a, b){return b.marketCap - a.marketCap});
      for (let i = 0; i < cryptocurrencies.length; i++) {
        cryptocurrencies[i].rank = i+1;
      }
      console.log(cryptocurrencies);
      this.setState({cryptocurrencies:cryptocurrencies});
    });

  }

  renderChange(change) {
    if (change >= 0) {
      return 'rgb(31,199,142)';
    } else {
      return 'rgb(252,0,0)';
    }
  }

  renderCryptocurrencies() {
    let cryptocurrencies = this.state.cryptocurrencies;
    if (!cryptocurrencies) {
      console.log('Loading');
    } else {
      return(
        cryptocurrencies.map(cryptocurrency =>
          // <tr key={cryptocurrency.id}>
          //   <td><Link to={`/market/${cryptocurrency.id}`}>{cryptocurrency.rank}</Link></td>
          //   <td><div style={{height:'1.2em',maxWidth:'10em',whiteSpace:'nowrap',overflow:'scroll'}}><Link to={`/market/${cryptocurrency.id}`}><i className="fa fa-btc"></i> {cryptocurrency.name}</Link></div></td>
          //   <td><Link to={`/market/${cryptocurrency.id}`}>${cryptocurrency.market_cap_usd}</Link></td>
          //   <td><Link to={`/market/${cryptocurrency.id}`}>${cryptocurrency.price_usd}</Link></td>
          //   <td><Link to={`/market/${cryptocurrency.id}`}>{cryptocurrency.total_supply}</Link></td>
          //   <td><Link to={`/market/${cryptocurrency.id}`}>${cryptocurrency['24h_volume_usd']}</Link></td>
          //   <td><Link to={`/market/${cryptocurrency.id}`} style={{color:this.renderChange(cryptocurrency.percent_change_24h)}}>{cryptocurrency.percent_change_24h}%</Link></td>
          // </tr>
          <tr key={cryptocurrency.symbol}>
            <td><Link to={`/market/${cryptocurrency.reddit}`}>{cryptocurrency.rank}</Link></td>
            <td>
              <Link to={`/market/${cryptocurrency.reddit}`}>
                <div className='nameCell' style={{borderLeft:`5px solid ${cryptocurrency.color}`}}>{cryptocurrency.name}</div>
              </Link>
            </td>
            <td><Link to={`/market/${cryptocurrency.reddit}`}>${cryptocurrency.marketCap}</Link></td>
            <td><Link to={`/market/${cryptocurrency.reddit}`}>${cryptocurrency.globalPrice}</Link></td>
            <td><Link to={`/market/${cryptocurrency.reddit}`}>{cryptocurrency.availableSupply}</Link></td>
            <td><Link to={`/market/${cryptocurrency.reddit}`}>${cryptocurrency['24hVolume']}</Link></td>
            <td><Link to={`/market/${cryptocurrency.reddit}`} style={{color:this.renderChange(cryptocurrency['24hPercentChange'])}}>{cryptocurrency['24hPercentChange']}%</Link></td>
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
