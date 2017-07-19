import React from "react";
import Footer from "./Footer";
import Charts from "./Charts";
import Cards from "./Cards";
import $ from "jquery";

export default class ReactApp extends React.Component {
    
    constructor(){
        super();
        
        this.state = {
            stocks: [],
            message: ''
        };
        
        this.getStocks = this.getStocks.bind(this);
        this.removeSym = this.removeSym.bind(this);
        this.addSym = this.addSym.bind(this);
        this.clearFlash = this.clearFlash.bind(this);
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
    
    addSym(str) {
        let obj = {sym:str};
        $.ajax({
          url: `/api/add`,
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
              this.setState({
                  message: data.message
              });
              this.getStocks();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(`/api/add`, status, err.toString());
          }.bind(this)
        });
        console.log(`${str} added!`);
    }
    
    removeSym(str) {
        let obj = {sym:str};
        $.ajax({
          url: `/api/del`,
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
              this.setState({
                  message: data.message
              });
              this.getStocks();
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(`/api/add`, status, err.toString());
          }.bind(this)
        });
        console.log(`${str} removed!`);
    }
    
    componentDidMount() {
        this.getStocks();
    }
    
    componentDidUpdate() {
        if(this.state.message){
          this.clearFlash();
        }
    }
  
    clearFlash(){
        setTimeout(() => {
        console.log('timer activated');
            this.setState({message: ''});
        }, 10000);
    }
    
    render() {
        const flatUI = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", 
                    "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", 
                    "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", 
                    "#bdc3c7", "#7f8c8d"
                    ];
        let stocks = this.state.stocks.map((s, i) => {
            s.color = flatUI[i];
            return s;
        })
        return (
            <div>
                <div className="container">
                    <h1 className="text-center text-info stock">Free Code Camp | Stock Market App</h1>
                </div>
                <Charts stocks={this.state.stocks}/>
                <Cards stocks={this.state.stocks} message={this.state.message} remove={this.removeSym} add={this.addSym}/>
                <Footer />
            </div>
        );
    }
}