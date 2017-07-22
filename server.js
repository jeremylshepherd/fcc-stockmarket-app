'use strict';

require('babel-register')({
    presets: ["es2015", "react", "stage-2"]
});

var express = require('express');
var app = express();
require('dotenv').load();
var path = require("path");
var http = require('http').Server(app);
var async = require("async");
var request = require("request");
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

let stocks = ['AAPL', 'MSFT', 'AMZN', 'GOOGL'];
let users = [];
let intCounter = 0;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

let getStocks = (sym, fn) => {
    const options = {  
        url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${sym}&interval=15min&outputsize=full&apikey=${process.env.API_KEY}`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };
    request(options, function(err, res, body) {
        if(err) {fn(err, null);}
        fn(null, JSON.parse(body));
    });
};

let reformat = (arr) => {
    let ref = arr.map((r) => {
        let obj = {};
        let key = r["Meta Data"]["2. Symbol"];
        let data = r["Time Series (15min)"];
        let timeKeys = Object.keys(data);
        let betterDS = [];
        for(let i = 0; i < timeKeys.length; i++) {
            let dat = {};
            dat.time = timeKeys[i];
            dat.close = data[timeKeys[i]]["4. close"];
            betterDS.push(dat);
        }
        betterDS = betterDS.slice(0, 144);
        obj.sym = key;
        obj.data = betterDS;
        return obj;
    });
    return ref;
};


//Needs more comprehensive of update/don't update algorithm to eliminate off-hours api calls
let updateNow = (d, n) => {
    let date = new Date();
    let day = date.getDay();
    if(day !== 6 && day !== 0 && (d + 900000 < n)) {
        io.emit('console', 'New data incoming');
    }else{
        console.log('No update');
    }
};

app.get('/api/stocks', (req, res) => {
    const done = (err, results) => {
        if(err) {return err;}
        results = results.slice(0, 144);
        let data = reformat(results);
        intCounter = Date.parse(data.data[0].time);
        console.log(`app.get: ${intCounter}`);
        res.json(data);
    };
    async.concat(stocks, getStocks, done);
});

app.get('*', (req, res) => {
  res.render('index.ejs');
});

io.on('connection', socket => {
    users.push(socket);
    io.emit('console', `New user connected`);
    console.log(`${users.length} users connected.`);
    
    //20 seconds interval to check if data is current within the quarter=hour update
    if(users.length > 0) {
        this.checker = setInterval(() => {
            updateNow(intCounter, Date.now());
        }, 20000);
    }
    
    socket.on('add', msg => {
        let sym = msg;
        let done = (err, results) => {
            if(err) {
                console.log('err');
            }
            if(Object.keys(results)[0] === 'Error Message'){
                io.emit('error', 'Please use a valid symbol');
            }else{
                stocks.push(sym);
                io.emit('console', `${sym} added.`);
            }
        };
        getStocks(sym, done);
    });
    
    socket.on('del', msg => {
        let sym = msg;
        stocks.splice(stocks.indexOf(sym), 1);
        io.emit('console', `${sym} was removed`);
    });
    
    socket.on('data', msg => {
        const done = (err, results) => {
            if(err) {return err;}
            results = results.slice(0, 144);
            let data = reformat(results);
            intCounter = Date.parse(data[0].data[0].time);
            io.emit('update', data);
        };
        async.concat(stocks, getStocks, done);
    });
    
    socket.on('disconnect', msg => {
        users.splice(users.indexOf(socket), 1);
        if(users.length === 0) {
            clearInterval(this.checker);
        }
        console.log(`${users.length} users connected.`);
    });
});

// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
  app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) =>{
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});