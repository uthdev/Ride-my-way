'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// set port for server to listen on
var Port = process.env.PORT || 5000;

// support parsing of application/json type post data
app.use(_bodyParser2.default.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use('/api/v1/rides', _index2.default);

// Subscribe server to a particular port
app.listen(Port, function () {
  return console.log('Server Started At ' + Port);
});

// export app
exports.default = app;