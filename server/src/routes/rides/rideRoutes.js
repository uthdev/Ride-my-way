import express from 'express';
import { json, urlencoded } from 'body-parser';
import RideController from '../../controllers/RideControllers';
import { ensureAutheticated } from '../../middleware/auth/authMiddleware';

const rideRoute = express();

// for parsing application/json
rideRoute.use(json());

// for parsing application/x-ww-form-urlencoded
rideRoute.use(urlencoded({ extended: true }));
rideRoute.use(ensureAutheticated);

rideRoute.route('/')

  /* Get all ride offers */

  .get(RideController.allRideOffer);

rideRoute.route('/:id')

  /* Get ride details of a single ride offer */
  .get(RideController.getRideOffer);

rideRoute.route('/:rideId/requests')

  /* Send request to join ride */
  .post(RideController.joinRide);

rideRoute.route('/owner/:rideOwnerId')

  /* Get ride offers of a particular user */
  .get(RideController.getUserRideOffer);

export default rideRoute;
