import dbPool from '../config/dbConnection';
import { find, createRideOffer } from '../helpers/queryHelpers';
import { parsedInt, error, success, isValid, failure } from '../helpers/helpers';

/**
 * Processes all ride data
 * @class RideController
 */

class RideOfferController {
  /**
   *
   * @returns {Object} A the created ride offer
   */

  static createRideOffer(req, res) {
    const {
      rideTitle,
      location,
      destination,
      departureTime,
      noOfSeats,
      rideOwnerId,
    } = req.body;

    const { errCode, errMsg } = isValid(req.body);


    // check is ride is valid

    if (!errMsg) {
      const values = [rideTitle, location, destination, departureTime, noOfSeats, rideOwnerId, 'NOW()', 'NOW()', 'NOW()'];
      return dbPool.query(find('"rideTitle"', 'rideoffers', '"rideTitle"', rideTitle), (err, result) => {
        if (err) {
          return error(res, 501, 'Could not establish database connection');
        }
        if (result.rowCount > 0) {
          return failure(res, 403, 'Ride offer already exist');
        }
        return dbPool.query(createRideOffer, values, (err, response) => {
          if (err) {
            return error(res, 501, 'Could not establish database connection');
          }
          if (response.rowCount > 0) {
            const rideoffers = response.rows;
            return success(res, 200, { message: 'New ride offer created', rideoffers });
          }
          return error(res, 500, 'Could not process your request');
        });
      });
    }
    return error(res, errCode, errMsg);
  }
}

export default RideOfferController;
