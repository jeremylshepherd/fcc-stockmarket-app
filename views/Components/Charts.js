import React, { Component, } from 'react';
import Chart from './Chart';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const factor = 600/this.props.stocks.length;
    let charts = this.props.stocks.map((c, i) => {
      let numFormat = c.data.map((d) => {
        d.close = +d.close;
        return d;
      });
        return <Chart 
                sym={c.sym} 
                stock={numFormat} 
                key={i} index={i} 
                width={1200} 
                height={factor} 
                color={c.color}
              />
    });
    return (
        <div>
          {charts}
        </div>
      );
  }
}