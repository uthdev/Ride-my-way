import dbPool from '../config/dbConnection';
import { find, findAll } from '../helpers/queryHelpers';
import { parsedInt, error, success } from '../helpers/helpers';

/**
 * Processes all ride data
 * @class RideController
 */

class RideController {
  /**
   *
   * @returns {Object} Array ride offers
   */
  static allRideOffer(req, res) {
    dbPool.query(findAll('*', 'rideOffers'), (err, response) => {
      if (err) {
        return error(res, 500, 'Could not establish database connection');
      }
      if (response.rowCount > 0) {
        const rideOffers = response.rows;
        return success(res, 200, { message: 'All ride offers', rideOffers });
      }
    });
  }

  /**
   *
   * @returns {Object} information about a ride
   */

  static getRideOffer(req, res) {
    const { id } = req.params;

    const parsedId = parsedInt(id);
    let rideDetails = '';

    /* Check if id is  a Not a number */
    if (!(Number.isInteger(parsedId))) {
      return error(res, 400, 'Ride id is invalid');
    }

    rideDetails = find(rideOffersDb, parsedId);
    // if ride is found rerurn ride
    if (rideDetails) return success(res, 200, 'Found a ride', rideDetails);
    return error(res, 404, 'The ride offer you requested does not exist');
  }

  /**
   *
   * @returns {Object} An update array of ride offers
   */

  static createRideOffer(req, res) {
    const rideOffer = req.body;

    // check is ride is valid
    if (isValid(rideOffer)) {
      rideOffersDb.push({
        id: rideOffersDb.length + 1,
        ...rideOffer,
      });
      return success(res, 201, 'New ride offer has been created', rideOffersDb);
    }
    return error(res, 400, 'Please enter the missing fields');
  }

  /**
   *
   *@returns {Object} status of a ride request
   */
  static joinRide(req, res) {
    // Ride id
    const { id } = req.params;
    const parsedId = parsedInt(id);
    // reques body
    const requestOption = req.body;
    // ride request to be sent to ride owner
    let rideRequest = {};
    let index = 0;

    /* Validate request details */
    const userSeat = requestOption.seats;

    // used variables
    let noOfSeats = 0;
    let passengerArr = [];


    // Check if there is space for additional ride offers
    if (isRequestValid(requestOption)) {
      rideRequest = findRequest(rideRequestDb, parsedId);
      // re-assign use variables
      noOfSeats = rideRequest.noOfSeats + 1;
      passengerArr = rideRequest.passengersId.length;

      // check to see if passengers seats are already occuppied
      if (isSeatValid(noOfSeats, passengerArr, userSeat)) {
        // Add passenger multiple passengers for one user
        while (userSeat > index) {
          rideRequest.passengersId.push(requestOption.id);
          index += 1;
        }

        rideRequest.noOfSeatsLeft = (rideRequest.noOfSeats) - (rideRequest.passengersId.length);
        return success(res, 200, 'Ride request sent', rideRequest);
      }
      return error(res, 201, 'Your cannot join this ride the passengers are already complete');
    }
    return error(res, 400, 'Invalid request token');
  }
}

export default RideController;
