import React, { Component, } from 'react';
import Chart from './Chart';

const Charts = (props) => {
    const factor = 800/props.stocks.length;
    
    let charts = props.stocks.map((c, i) => {
      let numFormat = c.data.map((d) => {
        d.close = +d.close;
        return d;
      });
        return ( 
              <Chart 
                sym={c.sym} 
                stock={numFormat} 
                key={i} index={i} 
                width={1200} 
                height={factor} 
                color={c.color}
              />
            );
    });
    return (
        <div>
          {charts}
        </div>
      );
  };

export default Charts;