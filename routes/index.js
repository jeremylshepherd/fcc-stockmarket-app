'use strict';
require('babel-register')({
    presets: ["react"]
});

var express = require('express');
var router = express.Router();
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
    let stocks = currentStocks;
    let getStocks = (sym) => {
      const options = {  
            url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${sym}&interval=15min&outputsize=full&apikey=${process.env.API_KEY}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        request(options, function(err, res, body) {
            if(err) {console.log(err);}
            return JSON.parse(body);
        });  
    };
    let stockJSON = async.map(stocks, getStocks, (err, results) => {
        if(err) {console.log(err);}
        return results;
    });
    res.json(stockJSON);
});


router.get('*', (req, res) => {
    res.render('index.ejs');
});

module.exports = router;