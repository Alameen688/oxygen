'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./router/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;
app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/api/v1/entries', _index2.default.entries);

app.use(function (req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use(function (error, req, res) {
  return res.status(error.status || 404).json({
    status: error,
    message: error.message
  });
});

// listen only when not testing
// this is to avoid Uncaught Error: listen EADDRINUSE :::3000
if (!module.parent) {
  app.listen(port, function () {
    console.log('Listening on port ' + port);
  });
}

// export app for testing
module.exports = app;