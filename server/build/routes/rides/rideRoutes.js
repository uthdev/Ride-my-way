'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _RideControllers = require('../../controllers/RideControllers');

var _RideControllers2 = _interopRequireDefault(_RideControllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rideRoute = (0, _express2.default)();

// for parsing application/json
rideRoute.use((0, _bodyParser.json)());

// for parsing application/x-ww-form-urlencoded
rideRoute.use((0, _bodyParser.urlencoded)({ extended: true }));

rideRoute.route('/')

/* Get all ride offers */

.get(_RideControllers2.default.allRideOffer)

/* Create ride offer */
.post(_RideControllers2.default.createRideOffer);

rideRoute.route('/:id')

/* Get ride details of a single ride offer */
.get(_RideControllers2.default.getRideOffer);

rideRoute.route('/:id/requests')

/* Send request to join ride */
.post(_RideControllers2.default.joinRide);

exports.default = rideRoute;