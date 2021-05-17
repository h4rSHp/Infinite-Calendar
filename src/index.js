import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

var d = new Date()
var month = d.getMonth()
var year = 2020

ReactDOM.render(
  <App month={month} year={year} />, document.getElementById('root')
);