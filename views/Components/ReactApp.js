import React from "react";
import Footer from "./Footer";
import Charts from "./Charts";
import Cards from "./Cards";
import $ from "jquery";
import SocketIOClient from "socket.io-client";

export default class ReactApp extends React.Component {
    
    constructor(){
        super();
        
        this.state = {
            stocks: [],
            flash: ''
        };
        
        this.getStocks = this.getStocks.bind(this);
        this.removeSym = this.removeSym.bind(this);
        this.addSym = this.addSym.bind(this);
        this.flash = this.flash.bind(this);
        this.clearFlash = this.clearFlash.bind(this);
        
        this.socket = SocketIOClient();
        this.socket.on('console', (msg) => {
            this.flash(msg);
            this.socket.emit('data', 'data');
        });
        this.socket.on('error', (msg) => {
            this.flash(msg);
        });
        this.socket.on('update', (data) => {
            console.log(data);
            this.setState({
                stocks: data
            });
        });
    }
    
    flash(str) {
        this.setState({flash: str});
    }
    
    getStocks() {
        this.socket.emit('data', 'getStocks');
    }
    
    addSym(str) {
        this.socket.emit('add', str.toUpperCase());
    }
    
    removeSym(str) {
        this.socket.emit('del', str.toUpperCase());
    }
    
    componentDidMount() {
        this.getStocks();
    }
    
    componentDidUpdate() {
        if(this.state.flash){
          this.clearFlash();
        }
    }
  
    clearFlash(){
        setTimeout(() => {
        console.log('timer activated');
            this.setState({flash: ''});
        }, 7000);
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
        });
        return (
            <div>
                <div className="container">
                    <h1 className="text-center text-info stock h1">Free Code Camp | Stock Market App</h1>
                </div>
                <Charts stocks={stocks}/>
                <Cards stocks={stocks} message={this.state.flash} remove={this.removeSym} add={this.addSym}/>
                <Footer />
            </div>
        );
    }
}