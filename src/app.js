import React from 'react';
import ReactDOM from "react-dom";
import ReactApp from "../views/Components/ReactApp.js";
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import $ from 'jquery';
import boostrap$ from 'bootstrap-jquery';

let app = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={ReactApp} />
    </Router>, 
    app
);