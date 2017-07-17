import React, { Component, } from 'react';
import Chart from './Chart';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    let charts = this.props.stocks.map((c, i) => {
        return <Chart {...c} key={i} />
    });
    return (
        <div>
          {charts}
        </div>
      );
  }
}