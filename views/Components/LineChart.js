import React from 'react';
import {Chart} from 'react-d3-core';
import {LineChart} from 'react-d3-basic';

let DataViz = (props) => {
  // load your general data
  var chartData = props.stock;

  var width = 700,
    height = 300,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    title = props.sym,
    // chart series,
    // field: is what field your data want to be selected
    // name: the name of the field that display in legend
    // color: what color is the line
    chartSeries = [
      {
        field: 'close',
        name: 'Price',
        color: '#ff7f0e'
      }
    ],
    // your x accessor
    x = function(d) {
      console.log(d);
      return d.index;
    };

  return (
    <Chart
      title={title}
      width={width}
      height={height}
      margins= {margins}
      >
      <LineChart
        showXGrid= {false}
        showYGrid= {false}
        margins= {margins}
        title={title}
        data={chartData}
        width={width}
        height={height}
        chartSeries={chartSeries}
        x={x}
      />
    </Chart>
    );
};

export default DataViz;