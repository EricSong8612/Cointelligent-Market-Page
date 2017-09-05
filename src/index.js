import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

import Header from './components/header';
import Market from './components/market';

ReactDOM.render(
  <div>
    <Header />
    <Market />
  </div>
  ,document.getElementById('root')
);
