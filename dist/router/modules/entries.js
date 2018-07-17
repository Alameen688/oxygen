'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
	return res.status(200).json({
		status: 200,
		data: [{
			title: "On a codeine diet"
		}, {
			title: "A day I'll never forget"
		}]
	});
});

module.exports = router;