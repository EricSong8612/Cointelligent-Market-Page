import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarketChart from './market-chart';
// import { selectExchange } from '../actions/index';
// import { bindActionCreators } from 'redux';

class ExchangeDetail extends Component {
  renderPerformers() {
    if (!this.props.exchange) {
      this.props.exchange = this.props.exchanges[0];
    }

    return this.props.exchange.performers.map(performer => {
      return(
        <li
          key={performer}
          className='performer'
          // onClick={() => this.props.selectExchange(exchange)}
        >
          <span id={performer}>{performer}</span>
        </li>
      );
    });
  }

  render() {
    return(
      <div className='exchanges-details'>
        <ul>
          {this.renderPerformers()}
        </ul>
        <MarketChart />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    exchanges: state.exchanges,
    exchange: state.activeExchange
  };
}

export default connect(mapStateToProps)(ExchangeDetail);
