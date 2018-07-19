import dbPool from '../config/dbConnection';
import { find, findAll, joinRideQuery } from '../helpers/queryHelpers';
import { parsedInt, error, success, failure } from '../helpers/helpers';

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
      return failure(res, 404, { message: 'No ride offer found' });
    });
  }

  /**
   *
   * @returns {Object} information about a ride
   */

  static getRideOffer(req, res) {
    const { id } = req.params;
    const parsedId = parsedInt(id);

    /* Check if id is  a Not a number */
    if (!(Number.isInteger(parsedId))) {
      return error(res, 400, 'Ride id is invalid');
    }
    return dbPool.query(find('*', 'rideoffers', 'id', parsedId), (err, response) => {
      if (err) {
        return error(res, 500, 'Could not establish database connection');
      }
      if (response.rowCount > 0) {
        const rideOffer = response.rows[0];
        return success(res, 200, { message: 'Found One ride offer', rideOffer });
      }
      return failure(res, 404, { message: 'No ride offer found' });
    });
  }

  /**
   *
   *@returns {Object} status of a ride request
   */
  static joinRide(req, res) {
    // Ride id
    // console.log(req.userData.id);
    const { rideId } = req.params;
    let { rideOwnerId } = req.body;
    // console.log(req.body);
    rideOwnerId = parsedInt(rideOwnerId);
    // console.log(rideOwnerId);
    const passengerId = req.userData.id;
    const parsedId = parsedInt(rideId);
    const parsedPassengerId = parsedInt(passengerId);
    /* Check if id is  a Not a number */
    if (!(Number.isInteger(parsedId)) || !(Number.isInteger(parsedPassengerId)) || !(Number.isInteger(rideOwnerId))) {
      return error(res, 400, 'Ride is invalid');
    }
    const values = [rideId, passengerId, 'pending', rideOwnerId];
    return dbPool.query(find('"passengerId"', 'riderequests', '"rideId"', rideId), (err, response) => {
      if (err) {
        return error(res, 500, 'Could not establish database connection');
      }
      const passenger = response.rows[0];
      if ((response.rowCount > 0 && passenger.passengerId !== null)) {
        return failure(res, 400, { message: 'You have already sent a ride request' });
      }
      return dbPool.query(joinRideQuery, values, (err, result) => {
        const request = result.rows[0];
        if (err) {
          return error(res, 500, 'Could not establish database connection');
        }
        return success(res, 201, { message: 'Your ride request was sent successfully', request });
      });
    });
  }
}

export default RideController;
