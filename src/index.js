import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/index.css';
import './css/market.css';

import Header from './components/header';
import Market from './components/market';
import MarketChart from './components/market-chart';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/market/:id' component={MarketChart} />
        <Route path='/' component={Market} />
      </Switch>
    </div>
  </BrowserRouter>
  ,document.getElementById('root')
);
