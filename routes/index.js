'use strict';
require('babel-register')({
    presets: ["react"]
});

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Stock = require('../models/Stocks');
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var ReactApp = require("../views/Components/ReactApp");
var https =  require('https');
var request = require('request');
var async = require('async');


/******************************************************************************
****************______________API Routing______________************************
******************************************************************************/

let currentStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN'];

router.get('/api/stocks', (req, res) => {
    let stocks;
    Stock.findOne({}, (err, stock) => {
        if(err) {console.log('err: ', err);}
        if(!stock) {
            let stock = new Stock();
            stock.stocks = currentStocks;
            stock.save();
            stocks = currentStocks;
        }else{
            stocks = stock.stocks;
        }
        console.log(stocks);
        let getStocks = (sym, fn) => {
          const options = {  
                url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${sym}&interval=15min&outputsize=full&apikey=${process.env.API_KEY}`,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            };
            console.log(options.url);
            request(options, function(err, res, body) {
                if(err) {fn(err, null);}
                fn(null, JSON.parse(body));
            });
            
        };
        
        const done = (err, results) => {
            if(err) {return err;}
            results = results.slice(0, 144);
            let reformat = results.map((r) => {
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
            res.json(reformat);
        };
        async.concat(stocks, getStocks, done);
    });
});

router.get('/api/test', (req, res) => {
    Stock.find({}, (err, stocks) => {
        if(err) {console.log(err);}
        res.json(stocks);
    });
});

router.post('/api/add', (req, res) => {
    let sym = req.body.sym.toUpperCase();
    let getStocks = (sym, fn) => {
        const options = {  
            url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${sym}&interval=15min&outputsize=full&apikey=${process.env.API_KEY}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        console.log(options.url);
        request(options, function(err, res, body) {
            if(err) {fn(err, null);}
            fn(null, JSON.parse(body));
        });
    };
    let done = (err, results) => {
        if(err) {
            console.log('err');
            res.json(err);
        }
        if(Object.keys(results)[0] === 'Error Message'){
            res.json({'message': 'Please use a valid symbol'});
        }else{
            Stock.findOne({}, (err, stock) => {
                if(err) {console.log(err);}
                stock.stocks.addToSet(sym);
                stock.save();
                res.json({'message' : 'Stock saved.'});
            });
        }
    };
    getStocks(sym, done);
});

router.get('/api/test/:sym', (req, res) => {
    let sym = req.params.sym.toUpperCase();
    let getStocks = (sym, fn) => {
        const options = {  
            url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${sym}&interval=15min&outputsize=full&apikey=${process.env.API_KEY}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        console.log(options.url);
        request(options, function(err, res, body) {
            if(err) {fn(err, null);}
            fn(null, JSON.parse(body));
        });
    };
    let done = (err, results) => {
        if(err) {
            console.log('err');
            res.json(err);
        }
        if(Object.keys(results)[0] === 'Error Message'){
            res.json({'message': 'Please use a valid symbol'});
        }else{
            Stock.findOne({}, (err, stock) => {
                if(err) {console.log(err);}
                stock.stocks.addToSet(sym);
                stock.save();
                res.json({'message' : 'Stock saved.'});
            });
        }
    };
    getStocks(sym, done);
});


router.post('/api/del', (req, res) => {
    Stock.findOne({}, (err, stock) => {
        if(err) {console.log(err);}
        stock.stocks.remove(req.body.sym);
        stock.save();
        res.json({'message' : 'Stock removed.'});
    });
});

router.get('*', (req, res) => {
    res.render('index.ejs');
});

module.exports = router;