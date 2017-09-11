import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/market.css';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

class MarketChart extends Component {
  state={timePeriods:[{period:'1H', display:'selectedBorder'},
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

      fetch(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.state.snapshot.symbol}&tsym=USD&limit=60&e=CCCAGG
  `).then(response => {
        return response.json();
      }).then(within1Hour => {
        (within1Hour.Data).map(data => {
          data.timeLabel = this.timeLabel('1H', data.time);
          data.time = this.displayTime('1H', data.time);
        })
        this.setState({hourData:within1Hour.Data});
        this.setState({chartData:within1Hour.Data});
      });

      fetch(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.state.snapshot.symbol}&tsym=USD&e=CCCAGG
  `).then(response => {
        return response.json();
      }).then(within1Day => {
        (within1Day.Data).map(data => {
          data.timeLabel = this.timeLabel('1D', data.time);
          data.time = this.displayTime('1D', data.time);
        })
        this.setState({dayData:within1Day.Data});
      });

    fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${this.state.snapshot.symbol}&tsym=USD&e=CCCAGG
  `).then(response => {
        return response.json();
      }).then(within1Week => {
        (within1Week.Data).map(data => {
          data.timeLabel = this.timeLabel('1W', data.time);
          data.time = this.displayTime('1W', data.time);
        })
        this.setState({weekData:within1Week.Data});
      });

    fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${this.state.snapshot.symbol}&tsym=USD&limit=744&e=CCCAGG
  `).then(response => {
        return response.json();
      }).then(within1Month => {
        (within1Month.Data).map(data => {
          data.timeLabel = this.timeLabel('1M', data.time);
          data.time = this.displayTime('1M', data.time);
        })
        this.setState({monthData:within1Month.Data});
      });

    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.snapshot.symbol}&tsym=USD&limit=365&e=CCCAGG
  `).then(response => {
        return response.json();
      }).then(within1Year => {
        (within1Year.Data).map(data => {
          data.timeLabel = this.timeLabel('1Y', data.time);
          data.time = this.displayTime('1Y', data.time);
        })
        this.setState({yearData:within1Year.Data});
      });

    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.snapshot.symbol}&tsym=USD&limit=2000&e=CCCAGG
  `).then(response => {
        return response.json();
      }).then(all => {
        (all.Data).map(data => {
          data.timeLabel = this.timeLabel('ALL', data.time);
          data.time = this.displayTime('ALL', data.time);
        })
        this.setState({allData:all.Data});
      });

    });
  }

  displayTime(unit, time) {
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
    let displayTime = '';
      if (unit === '1Y' || unit === 'ALL') {
      displayTime = formalTime.getFullYear()+'/'+month+'/'+date;
      return displayTime;
    } else {
      displayTime = month+'/'+date+' '+hour+':'+min;
      return displayTime;
    }
  }

  timeLabel(unit, time) {
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
    let timeLabel = '';
    if (unit === '1H'|| unit === '1D') {
      timeLabel = hour+':'+min;
      return timeLabel;
    } else if (unit === '1W' || unit === '1M') {
      timeLabel = month+'/'+date;
      return timeLabel;
    } else {
      timeLabel = formalTime.getFullYear()+'/'+month+'/'+date;
      return timeLabel;
    }
  }

  renderChange(change) {
    if (change >= 0) {
      return 'rgb(31,199,142)';
    } else {
      return 'rgb(252,0,0)';
    }
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
            <h1 style={{fontSize:'1.5em'}}><div className='icon'>C</div> {snapshot.name}</h1>
            <h2 style={{fontWeight:'300', marginBottom:'0'}}>$<span style={{fontSize:'2em'}}>{price_int}</span>.{price_float}</h2>
            <p>
              <span className='tag' style={{color:this.renderChange(change_24hr)}}>{change_24hr} ({snapshot.percent_change_24h}%)</span>
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
      case '1H':
        this.setState({timePeriods:[{period:'1H', display:'selectedBorder'},
                                    {period:'1D', display:''},
                                    {period:'1W', display:''},
                                    {period:'1M', display:''},
                                    {period:'1Y', display:''},
                                    {period:'ALL', display:''}],
                       chartData:this.state.hourData});
        break;
      case '1D':
        this.setState({timePeriods:[{period:'1H', display:''},
                                    {period:'1D', display:'selectedBorder'},
                                    {period:'1W', display:''},
                                    {period:'1M', display:''},
                                    {period:'1Y', display:''},
                                    {period:'ALL', display:''}],
                       chartData:this.state.dayData});
        break;
      case '1W':
        this.setState({timePeriods:[{period:'1H', display:''},
                                    {period:'1D', display:''},
                                    {period:'1W', display:'selectedBorder'},
                                    {period:'1M', display:''},
                                    {period:'1Y', display:''},
                                    {period:'ALL', display:''}],
                       chartData:this.state.weekData});
        break;
      case '1M':
        this.setState({timePeriods:[{period:'1H', display:''},
                                    {period:'1D', display:''},
                                    {period:'1W', display:''},
                                    {period:'1M', display:'selectedBorder'},
                                    {period:'1Y', display:''},
                                    {period:'ALL', display:''}],
                       chartData:this.state.monthData});
        break;
      case '1Y':
        this.setState({timePeriods:[{period:'1H', display:''},
                                    {period:'1D', display:''},
                                    {period:'1W', display:''},
                                    {period:'1M', display:''},
                                    {period:'1Y', display:'selectedBorder'},
                                    {period:'ALL', display:''}],
                       chartData:this.state.yearData});
        break;
      case 'ALL':
        this.setState({timePeriods:[{period:'1H', display:''},
                                    {period:'1D', display:''},
                                    {period:'1W', display:''},
                                    {period:'1M', display:''},
                                    {period:'1Y', display:''},
                                    {period:'ALL', display:'selectedBorder'}],
                       chartData:this.state.allData});
        break;
      default:
        this.setState({timePeriods:[{period:'1H', display:'selectedBorder'},
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
    //console.log(chartData);
    if (!chartData) {
      console.log('Loading');
    } else {
      return(
        <div className='chartContainer'>
          <ResponsiveContainer width='100%' height={260} minWidth={300}>
          	<LineChart data={chartData}>
             <XAxis dataKey='timeLabel' axisLine={false} />
             <YAxis axisLine={false} type='number' domain={['dataMin - 10', 'dataMax + 10']} padding={{ bottom: 10 }}/>
             <CartesianGrid vertical={false} strokeDasharray='3 3'/>
             <Tooltip content={<CustomTooltip/>}/>
             <Line type='monotone' dataKey='close' stroke='rgb(31,199,142)' strokeWidth='2'  activeDot={{r: 6}}/>
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
        <h2><Link to='/'>MARKETS</Link></h2>
        {this.renderSnapshot()}
        {this.renderChart()}
      </div>
    )
  }
}

class CustomTooltip extends Component {
  render () {
    // console.log(this.props);
    const { active } = this.props;
    if (active) {
      const { payload, label } = this.props;
      return (
        <div className='chartTooltip'>
          <p>{`Time: ${payload[0].payload.time}`}</p>
          <p>{`Closed Price: $${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  }
};

export default MarketChart;
