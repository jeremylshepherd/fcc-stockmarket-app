import React from 'react';
import ReactDOM from "react-dom";
import ReactApp from "../views/Components/ReactApp.js";
import $ from 'jquery';
import boostrap$ from 'bootstrap-jquery';

let app = document.getElementById('app');

ReactDOM.render(
    <ReactApp />, 
    app
);