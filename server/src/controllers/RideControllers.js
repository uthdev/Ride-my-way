import rideOffersDb from '../dummydata/rideoffers';
import rideRequestDb from '../dummydata/riderequest';


/**
 * This is a representation of the recipes data
 * @class RideController
 */

class RideController {
  /**
   *
   * @returns {Object} Array ride offers
   */
  static allRideOffer(req, res) {
    return (rideOffersDb.length > 0) ? res.status(200).json(rideOffersDb) : res.status(404).json({ message: 'No Ride Offer' });
  }

  /**
   *
   * @returns {Object} information about a ride
   */

  static getRideOffer(req, res) {
    const { id } = req.params;

    const parsedId = (!(/^\d+$/.test(id))) ? NaN : parseInt(id, 10);
    let rideDetails = '';

    /* Check if id is  a Not a number */
    if (!(Number.isInteger(parsedId))) {
      return res.status(400).json({ message: 'Ride id is invalid' });
    }

    // if id is a number
    if (typeof (parsedId) === 'number') {
      rideOffersDb.find((ride) => {
        if (parsedId === ride.id) {
          rideDetails = ride;
        }
        return null;
      });
      if (rideDetails) return res.status(200).json(rideDetails);
      return res.status(404).json({
        message: 'The ride offer you requested does not exist',
      });
    }

    // no matching id
    return res.status(404).json({
      message: 'Id not found',
    });
  }

  /**
   *
   * @returns {Object} An update array of ride offers
   */

  static createRideOffer(req, res) {
    const rideOffer = req.body;

    // validations
    const name = rideOffer.name.trim() !== '';
    const location = rideOffer.location.trim() !== '';
    const destination = rideOffer.destination.trim() !== '';
    const departureTime = rideOffer.departureTime.trim() !== '';
    const price = typeof (rideOffer.price) === 'number' && rideOffer.price > 0;

    // check is rid
    if (name && location && destination && departureTime && price) {
      rideOffersDb.push({
        id: rideOffersDb.length + 1,
        ...rideOffer,
      });
      res.status(201).json({
        message: 'New ride offer has been created',
        rideOffersDb,
      });
    } else {
      res.status(400).json({
        error: 'Please enter the missing fields',
      });
    }
  }

  /**
   *
   *@returns {Object} status of a ride request
   */
  static joinRide(req, res) {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    const requestOption = req.body;
    let rideRequest = {};
    let index = 0;

    // validate request details
    const userId = requestOption.id;
    const seats = requestOption.seats >= 1;
    const userSeat = requestOption.seats;

    // used variables
    let noOfSeats = 0;
    let passengerArr = [];


    // Check if there is space for additional ride offers
    if (userId && seats) {
      rideRequestDb.find((request) => {
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
      if ((noOfSeats > passengerArr)
       && (noOfSeats > (passengerArr + userSeat))) {
        // Add passenger multiple passengers for one user
        while (userSeat > index) {
          rideRequest.passengersId.push(userId);
          index += 1;
        }

        rideRequest.noOfSeatsLeft = (rideRequest.noOfSeats) - (rideRequest.passengersId.length);
        return res.status(200).json({
          message: 'Ride request sent',
          rideRequest,
        });
      }
      res.status(201).json({
        message: 'Your cannot join this ride the passengers are already complete',
      });
    } else {
      return res.status(400).json({
        error: 'Invalid request token',
      });
    }
    return null;
  }

  static updateRideOffer(req, res) {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    let rideDetails = {};


    // Find the ride by id
    rideDetails = rideOffersDb.filter(ride => ride.id === parsedId);
    if (rideDetails !== {}) {
      rideDetails = {
        id: rideDetails.id,
        ...req.body,
      };

      res.status(200).json({
        message: 'Ride has been updated',
        rideOffersDb,
      });
    } else {
      res.status(404).json({
        message: 'Ride offer not found',
      });
    }
  }
}

export default RideController;
