import React from 'react';

export default class SearchCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {sym: ''};
        
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
    }
    
    update(e) {
        let name = e.target.name;
        this.setState({[name] : e.target.value.toUpperCase()});
    }
    
    add(e) {
        this.props.add(this.state.sym);
        this.setState({sym: ''});
    }
    
    render() {
        let cl = this.props.message == "Stock saved." ? 'text-success' : 'text-danger';
        let flash = this.props.message ? <span className={cl}>{this.props.message}</span> : null;
      	return (
            <div className="panel card" style={{border: `1px solid ${this.props.color}`}}>
            <div className="panel-heading" style={{backgroundColor: this.props.color}}>
              <h3 className="panel-title">{this.props.sym}</h3>
            </div>
            <div className="panel-body">
                {flash}
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter Ticker Symbol" value={this.state.sym} name="sym" onChange={this.update}/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.add}>ADD</button>
                        </span>
                    </div>
                </div>
            </div>
          </div>
        );
    }
  }