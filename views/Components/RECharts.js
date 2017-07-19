import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import React from 'react';

const SimpleLineChart = (props) => {
  	return (
  	      <ResponsiveContainer width="100%" height={props.height}>
                  <LineChart width={props.width} height={props.height} data={props.stock}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                         <XAxis dataKey="time"tick={false}/>
                         <YAxis type="number" allowDecimals={false} domain={[props.min - 5, props.max + 5]} />
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip/>
                         <Legend />
                         <Line type="monotone" dataKey="close" stroke={props.color} activeDot={{r: 2}} strokeWidth={4} dot={false}/>
                  </LineChart>
            </ResponsiveContainer>
    );
  };
export default SimpleLineChart;