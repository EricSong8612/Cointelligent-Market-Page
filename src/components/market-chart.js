import React from 'react';
import '../css/market.css';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
      {time: '1', value: 20},
      {time: '2', value: 24},
      {time: '3', value: 34},
      {time: '4', value: 18},
      {time: '5', value: 28},
      {time: '6', value: 24},
      {time: '7', value: 19},
      {time: '8', value: 29},
      {time: '9', value: 20},
      {time: '10', value: 30},
      {time: '11', value: 31},
      {time: '12', value: 24},
      {time: '13', value: 25},
      {time: '14', value: 20},
      {time: '15', value: 25},
      {time: '16', value: 30},
      {time: '17', value: 35},
      {time: '18', value: 33},
      {time: '19', value: 32},
      {time: '20', value: 35},
      {time: '21', value: 28},
      {time: '22', value: 25},
      {time: '23', value: 26},
      {time: '24', value: 29},
      {time: '25', value: 33},
      {time: '26', value: 32},
      {time: '27', value: 30},
      {time: '28', value: 35},
      {time: '29', value: 28},
      {time: '30', value: 30},
];
const SimpleLineChart = React.createClass({
	render () {
  	return (
      <div className='chart'>
        <div>
          <div className='summary'>
            <h1 style={{fontSize:'1.5em'}}><i className="fa fa-btc"></i> BITCOIN</h1>
            <h2 style={{fontWeight:'300', marginBottom:'0'}}>$<span style={{fontSize:'2em'}}>4235</span>.82</h2>
            <p>
              <span className='tag' style={{color:'rgb(31,199,142)'}}>+ 106.11 (20.43%)</span>
              <span className='tag' style={{color:'#aaa'}}> PAST DAY</span>
            </p>
          </div>
          <div className='snapshot'>
            <h3 style={{color:'#666'}}>24HOUR MARKET SNAPSHOT</h3>
            <div>
              <div className='values'><p>$4,192.38</p><p className='tag'>HIGH</p></div>
              <div className='values'><p>458,188,577</p><p className='tag'>VOLUME</p></div>
              <div className='values'><p>4,241.96</p><p className='tag'>BID</p></div>
            </div>
            <div>
              <div className='values'><p>$3,926.42</p><p className='tag'>LOW</p></div>
              <div className='values'><p>16,516,287 B</p><p className='tag'>SUPPLY</p></div>
              <div className='values'><p>$68,570,173,249</p><p className='tag'>MARKET CAP</p></div>
            </div>
          </div>
          <div className='clear'></div>
        </div>
        <div className='chartContainer'>
          <ResponsiveContainer width='100%' height={160} minWidth={300}>
          	<LineChart data={data}>
             <XAxis dataKey="time" axisLine={false}/>
             <YAxis axisLine={false}/>
             <CartesianGrid vertical={false} strokeDasharray="3 3"/>
             <Tooltip/>
             {/* <Legend /> */}
             <Line type="monotone" dataKey="value" stroke="rgb(31,199,142)" strokeWidth="2"  activeDot={{r: 6}}/>
            </LineChart>
          </ResponsiveContainer>
          <div className='timePeriod'>
            <ul>
              <li>1H</li>
              <li>1D</li>
              <li>1W</li>
              <li>1D</li>
              <li>1M</li>
              <li>1Y</li>
              <li>ALL</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
})

export default SimpleLineChart;
