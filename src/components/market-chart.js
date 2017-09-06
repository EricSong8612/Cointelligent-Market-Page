import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/market.css';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

class MarketChart extends Component {
  state={timePeriods:[{period:'1Min', display:''},
                      {period:'1H', display:'selectedBorder'},
                      {period:'1D', display:''},
                      {period:'1W', display:''},
                      {period:'1M', display:''},
                      {period:'1Y', display:''},
                      {period:'ALL', display:''}]};

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`https://api.coinmarketcap.com/v1/ticker/${id}/`).then(response => {
      return response.json();
    }).then(currency => {
      this.setState({snapshot:currency[0]});

      fetch(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.state.snapshot.symbol}&tsym=USD&limit=119&e=CCCAGG
  `).then(response => {
        return response.json();
      }).then(histominute => {
        (histominute.Data).map(data => {
          data.time = this.displayTime(data.time);
        })
        this.setState({minData:histominute.Data});
      });

      fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${this.state.snapshot.symbol}&tsym=USD&limit=119&e=CCCAGG
  `).then(response => {
        return response.json();
      }).then(histohour => {
        (histohour.Data).map(data => {
          data.time = this.displayTime(data.time);
        })
        this.setState({hourData:histohour.Data});
        this.setState({chartData:histohour.Data});
      });

      fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.snapshot.symbol}&tsym=USD&limit=59&e=CCCAGG
  `).then(response => {
        return response.json();
      }).then(histoday => {
        (histoday.Data).map(data => {
          data.time = this.displayTime(data.time);
        })
        this.setState({dayData:histoday.Data});
      });
    });
  }

  displayTime(time) {
    let formalTime = new Date(time*1000);
    let month = formalTime.getMonth()+1;
    if (month < 10) {
      month = '0' + month;
    };
    let date = formalTime.getDate();
    if (date < 10) {
      date = '0' + date;
    };
    let hour = formalTime.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    };
    let min = formalTime.getMinutes();
    if (min < 10) {
      min = '0' + min;
    };
    let displayTime = formalTime.getFullYear()+'/'+month+'/'+date+' '+hour+':'+min;
    return displayTime;
  }

  renderSnapshot() {
    let snapshot = this.state.snapshot;
    if (!snapshot) {
      console.log('Loading');
    } else {
      let change_24hr = (snapshot.price_usd * snapshot.percent_change_24h / 100).toFixed(2);
      let price_int = Math.floor(snapshot.price_usd);
      let price_float = (snapshot.price_usd).toString().split('.')[1];
      return(
        <div>
          <div className='summary'>
            <h1 style={{fontSize:'1.5em'}}><i className="fa fa-btc"></i>{snapshot.name}</h1>
            <h2 style={{fontWeight:'300', marginBottom:'0'}}>$<span style={{fontSize:'2em'}}>{price_int}</span>.{price_float}</h2>
            <p>
              <span className='tag' style={{color:'rgb(31,199,142)'}}>{change_24hr} ({snapshot.percent_change_24h}%)</span>
              <span className='tag' style={{color:'#aaa'}}> PAST DAY</span>
            </p>
          </div>
          <div className='snapshot'>
            <h3 style={{color:'#666'}}>24HOUR MARKET SNAPSHOT</h3>
            <div>
              <div className='values'><p>N/A</p><p className='tag'>HIGH</p></div>
              <div className='values'><p>{snapshot['24h_volume_usd']}</p><p className='tag'>VOLUME</p></div>
              <div className='values'><p>N/A</p><p className='tag'>BID</p></div>
            </div>
            <div>
              <div className='values'><p>N/A</p><p className='tag'>LOW</p></div>
              <div className='values'><p>{snapshot.total_supply}</p><p className='tag'>SUPPLY</p></div>
              <div className='values'><p>${snapshot.market_cap_usd}</p><p className='tag'>MARKET CAP</p></div>
            </div>
          </div>
          <div className='clear'></div>
        </div>
      )
    }
  }

  selectTime(time) {
    switch (time) {
      case '1Min':
        this.setState({timePeriods:[{period:'1Min', display:'selectedBorder'},
                                    {period:'1H', display:''},
                                    {period:'1D', display:''},
                                    {period:'1W', display:''},
                                    {period:'1M', display:''},
                                    {period:'1Y', display:''},
                                    {period:'ALL', display:''}],
                       chartData:this.state.minData});
        break;
      case '1H':
        this.setState({timePeriods:[{period:'1Min', display:''},
                                    {period:'1H', display:'selectedBorder'},
                                    {period:'1D', display:''},
                                    {period:'1W', display:''},
                                    {period:'1M', display:''},
                                    {period:'1Y', display:''},
                                    {period:'ALL', display:''}],
                       chartData:this.state.hourData});
        break;
      case '1D':
        this.setState({timePeriods:[{period:'1Min', display:''},
                                    {period:'1H', display:''},
                                    {period:'1D', display:'selectedBorder'},
                                    {period:'1W', display:''},
                                    {period:'1M', display:''},
                                    {period:'1Y', display:''},
                                    {period:'ALL', display:''}],
                       chartData:this.state.dayData});
        break;
      default:
        this.setState({timePeriods:[{period:'1Min', display:''},
                                    {period:'1H', display:'selectedBorder'},
                                    {period:'1D', display:''},
                                    {period:'1W', display:''},
                                    {period:'1M', display:''},
                                    {period:'1Y', display:''},
                                    {period:'ALL', display:''}],
                       chartData:this.state.hourData});
    }
  }

  renderTimePeriod() {
    let timePeriods = this.state.timePeriods;
    return(
      timePeriods.map(time => <li key={time.period} className={time.display} onClick={() => this.selectTime(time.period)}>{time.period}</li>)
    )
  }

  renderChart() {
    let chartData = this.state.chartData;
    if (!chartData) {
      console.log('Loading');
    } else {
      return(
        <div className='chartContainer'>
          <ResponsiveContainer width='100%' height={260} minWidth={300}>
          	<LineChart data={chartData}>
             <XAxis dataKey="time" axisLine={false} />
             <YAxis axisLine={false} type="number" domain={['dataMin - 10', 'dataMax + 10']} padding={{ bottom: 10 }}/>
             <CartesianGrid vertical={false} strokeDasharray="3 3"/>
             <Tooltip />
             <Line type="monotone" dataKey="close" stroke="rgb(31,199,142)" strokeWidth="2"  activeDot={{r: 6}}/>
            </LineChart>
          </ResponsiveContainer>
          <div className='timePeriod'>
            <ul>
              {this.renderTimePeriod()}
            </ul>
          </div>
        </div>
      )
    }
  }

  render() {
    return(
      <div className='chart'>
        <Link to='/'><h2>MARKETS</h2></Link>
        {this.renderSnapshot()}
        {this.renderChart()}
      </div>
    )
  }
}

export default MarketChart;
