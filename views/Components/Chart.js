import React, { Component, } from 'react';
import SimpleLineChart from './RECharts';

export default class Chart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let prices = this.props.stock.map((o) => {
            return o.close; 
        });
        let min = Math.floor(Math.min(...prices));
        let max = Math.ceil(Math.max(...prices));
        return (
            <div className="container-fluid">
                <div style={{backgroundColor: this.props.color}}>
                    <h4 style={{color: '#fff', backgroundColor: this.props.color, padding: 4}}>
                        {this.props.sym}
                    </h4>
                    <div style={{border: `2px solid ${this.props.color}`, backgroundColor: '#fff'}}>
                        <SimpleLineChart {...this.props} max={max} min={min}/>
                    </div>
                    <h6 style={{color: '#fff', backgroundColor: this.props.color, padding: 4}}>
                        {`Current Value: ${this.props.stock[0].close} @ ${this.props.stock[0].time.split(' ')[1]}`}
                    </h6>
                </div>
            </div>
        );
    }
}

/*
    
*/