import express from 'express';
import { json, urlencoded } from 'body-parser';
import RideController from '../../controllers/RideControllers';

const rideRoute = express();

// for parsing application/json
rideRoute.use(json());

// for parsing application/x-ww-form-urlencoded
rideRoute.use(urlencoded({ extended: true }));

rideRoute.route('/')

  /* Get all ride offers */

  .get(RideController.allRideOffer)

  /* Create ride offer */
  .post(RideController.createRideOffer);


rideRoute.route('/:id')

  /* Get ride details of a single ride offer */
  .get(RideController.getRideOffer);

rideRoute.route('/:id/requests')

  /* Send request to join ride */
  .post(RideController.joinRide);


export default rideRoute;
