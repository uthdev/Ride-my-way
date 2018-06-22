'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rideoffers = require('../dummydata/rideoffers');

var _rideoffers2 = _interopRequireDefault(_rideoffers);

var _riderequest = require('../dummydata/riderequest');

var _riderequest2 = _interopRequireDefault(_riderequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is a representation of the recipes data
 * @class RideController
 */

var RideController = function () {
  function RideController() {
    _classCallCheck(this, RideController);
  }

  _createClass(RideController, null, [{
    key: 'allRideOffer',

    /**
     *
     * @returns {Object} Array ride offers
     */
    value: function allRideOffer(req, res) {
      return _rideoffers2.default.length > 0 ? res.status(200).json(_rideoffers2.default) : res.status(404).json({ message: 'No Ride Offer' });
    }

    /**
     *
     * @returns {Object} information about a ride
     */

  }, {
    key: 'getRideOffer',
    value: function getRideOffer(req, res) {
      var id = req.params.id;


      var parsedId = !/^\d+$/.test(id) ? NaN : parseInt(id, 10);
      var rideDetails = '';

      /* Check if id is  a Not a number */
      if (!Number.isInteger(parsedId)) {
        return res.status(400).json({ message: 'Ride id is invalid' });
      }

      // if id is a number
      if (typeof parsedId === 'number') {
        _rideoffers2.default.find(function (ride) {
          if (parsedId === ride.id) {
            rideDetails = ride;
          }
          return null;
        });
        if (rideDetails) return res.status(200).json(rideDetails);
        return res.status(404).json({
          message: 'The ride offer you requested does not exist'
        });
      }

      // no matching id
      return res.status(404).json({
        message: 'Id not found'
      });
    }

    /**
     *
     * @returns {Object} An update array of ride offers
     */

  }, {
    key: 'createRideOffer',
    value: function createRideOffer(req, res) {
      var rideOffer = req.body;

      // validations
      var name = rideOffer.name.trim() !== '';
      var location = rideOffer.location.trim() !== '';
      var destination = rideOffer.destination.trim() !== '';
      var departureTime = rideOffer.departureTime.trim() !== '';
      var price = typeof rideOffer.price === 'number' && rideOffer.price > 0;

      // check is rid
      if (name && location && destination && departureTime && price) {
        _rideoffers2.default.push(_extends({
          id: _rideoffers2.default.length + 1
        }, rideOffer));
        res.status(201).json({
          message: 'New ride offer has been created',
          rideOffersDb: _rideoffers2.default
        });
      } else {
        res.status(400).json({
          error: 'Please enter the missing fields'
        });
      }
    }

    /**
     *
     *@returns {Object} status of a ride request
     */

  }, {
    key: 'joinRide',
    value: function joinRide(req, res) {
      var id = req.params.id;

      var parsedId = parseInt(id, 10);
      var requestOption = req.body;
      var rideRequest = {};
      var index = 0;

      // validate request details
      var userId = requestOption.id;
      var seats = requestOption.seats >= 1;
      var userSeat = requestOption.seats;

      // used variables
      var noOfSeats = 0;
      var passengerArr = [];

      // Check if there is space for additional ride offers
      if (userId && seats) {
        _riderequest2.default.find(function (request) {
          // Filter out request and reassign it to riderequest
          if (request.rideId === parsedId) {
            rideRequest = request;
          }
          return null;
        });
        // re-assign use variables
        noOfSeats = rideRequest.noOfSeats + 1;
        passengerArr = rideRequest.passengersId.length;

        // check to see if passengers seats are already occuppied
        if (noOfSeats > passengerArr && noOfSeats > passengerArr + userSeat) {
          // Add passenger multiple passengers for one user
          while (userSeat > index) {
            rideRequest.passengersId.push(userId);
            index += 1;
          }

          rideRequest.noOfSeatsLeft = rideRequest.noOfSeats - rideRequest.passengersId.length;
          return res.status(200).json({
            message: 'Ride request sent',
            rideRequest: rideRequest
          });
        }
        res.status(201).json({
          message: 'Your cannot join this ride the passengers are already complete'
        });
      } else {
        return res.status(400).json({
          error: 'Invalid request token'
        });
      }
      return null;
    }
  }]);

  return RideController;
}();

exports.default = RideController;