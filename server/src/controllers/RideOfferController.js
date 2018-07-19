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
      const values = [rideTitle, location, destination, departureTime, noOfSeats, 'NOW()', parsedInt(rideOwnerId)];
      return dbPool.query(find('"rideTitle"', 'rideoffers', '"rideTitle"', rideTitle), (err, result) => {
        if (err) {
          // console.log(err);
          return error(res, 501, 'Could not establish database connection');
        }
        if (result.rowCount > 0) {
          return failure(res, 403, 'Ride offer already exist');
        }
        return dbPool.query(createRideOffer, values, (err, response) => {
          if (err) {
            console.log(err);
            return error(res, 501, 'Could not establish database connection');
          }
          if (response.rowCount > 0) {
            const rideoffers = response.rows;
            return success(res, 200, { message: 'New ride offer created', rideoffers });
          }
          return error(res, 404, 'Could not process your request');
        });
      });
    }
    return error(res, errCode, errMsg);
  }

  static fetchAllRideRequest(req, res) {
    let { rideId } = req.params;
    rideId = parsedInt(rideId);
    /* Check if id is  a Not a number */
    if (!(Number.isInteger(rideId))) {
      return error(res, 400, 'Ride is invalid');
    }
    return dbPool.query(find('*', 'riderequests', '"rideId"', rideId), (err, result) => {
      if (err) {
        return error(res, 500, 'Could not establish database connection');
      }
      const riderequests = result.rows;
      if (result.rowCount > 0) {
        return success(res, 200, { message: 'Your ride requests', riderequests });
      }
      return failure(res, 404, { message: 'No ride request found' });
    });
  }

  static acceptRideRequest(req, res) {
    let { rideId, requestId } = req.params;
    const { status } = req.body;
    // const token = req.headers.authorization.split(' ')[1];
    // const decoded = jwt.verify(token, dbConfig.secret);

    rideId = parsedInt(rideId);
    requestId = parsedInt(requestId);
    // console.log(requestId);

    /* Check if id is  a Not a number */
    if (!(Number.isInteger(rideId)) || !(Number.isInteger(requestId)) || status.trim() === '') {
      return error(res, 400, 'Invalid credentials');
    }
    if (status.toLowerCase() === 'rejected') {
      return dbPool.query(`DELETE FROM riderequests  WHERE id = '${requestId}' AND "rideId"='${rideId}' RETURNING *;`, (err, response) => {
        if (err) {
          return error(res, 500, 'Could not establish database connection');
        }
        return success(res, 200, { message: '1 ride offer declined' });
      });
    }
    return dbPool.query(`UPDATE riderequests SET status =' ${status}' WHERE "rideId"='${rideId}' AND id = '${requestId}' RETURNING *;`, (err, response) => {
      if (err) {
        return error(res, 400, 'Invalid credentials');
      }
      return success(res, 200, { message: 'Acceptance successful' });
    });
  }
}

export default RideOfferController;
