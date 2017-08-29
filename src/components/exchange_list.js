import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectExchange } from '../actions/index';
import { bindActionCreators } from 'redux';

class ExchangeList extends Component {
  renderList() {
    return this.props.exchanges.map(exchange => {
      return(
        <li
          key={exchange.name}
          onClick={() => this.props.selectExchange(exchange)}
        >
          <span id={exchange.name}>{exchange.name}</span>
        </li>
      );
    });
  }

  render() {
    return(
      <div className='exchanges'>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exchanges: state.exchanges
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectExchange: selectExchange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeList);
