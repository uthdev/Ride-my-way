'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// set port for server to listen on
var Port = 5000;

// support parsing of application/json type post data
app.use(_bodyParser2.default.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// Subscribe server to a particular port
app.listen(Port, function (req, res) {
  return console.log('Server Started At ' + Port);
});