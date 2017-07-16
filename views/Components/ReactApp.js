import React from "react";
import Footer from "./Footer";
import Charts from "./Charts";
import $ from "jquery";

export default class ReactApp extends React.Component {
    
    constructor(){
        super();
        
        this.state = {
            stocks: []
        };
        
        this.getStocks = this.getStocks.bind(this);
    }
    
    getStocks() {
        $.ajax({
        url: '/api/stocks',
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({
                stocks: data
            });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/stocks', status, err.toString());
        }.bind(this)
      });
    }
    
    componentDidMount() {
        this.getStocks();
    }
    
    render() {
        return (
            <div>
                <Charts stocks={this.state.stocks}/>
                <Footer />
            </div>
        );
    }
}