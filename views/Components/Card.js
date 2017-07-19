import React from 'react';
export default class Card extends React.Component {
    constructor(props) {
        super(props);
        
        this.remove = this.remove.bind(this);
    }
    
    remove(e) {
        this.props.remove(this.props.sym);
    }
    
    render() {
      	return (
            <div className="panel card" style={{border: `1px solid ${this.props.color}`}}>
            <div className="panel-heading" style={{backgroundColor: this.props.color}}>
              <h3 className="panel-title">{this.props.sym}</h3>
            </div>
            <div className="panel-body">
                <h1 className="stock">{this.props.sym}</h1>
                <p className="stock">To stop tracking stock, please click below.</p>
              <span className="btn btn-primary stock" onClick={this.remove}>Stop</span>
            </div>
          </div>
        );
    }
  }