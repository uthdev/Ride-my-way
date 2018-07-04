import express from 'express';
import { json, urlencoded } from 'body-parser';
import RideOfferController from '../../controllers/RideOfferController';

const rideoffersRoute = express();

// for parsing application/json
rideoffersRoute.use(json());

// for parsing application/x-ww-form-urlencoded
rideoffersRoute.use(urlencoded({ extended: true }));

rideoffersRoute.route('/rides')


  /* Create ride offer */
  .post(RideOfferController.createRideOffer);


rideoffersRoute.route('/rides/:rideId/requests')


  /* Create ride offer */
  .get(RideOfferController.fetchAllRideRequest);
export default rideoffersRoute;
