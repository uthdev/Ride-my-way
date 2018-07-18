import express from 'express';
import { json, urlencoded } from 'body-parser';
import AuthController from '../../controllers/AuthController';

const authRoute = express();

// for parsing application/json
authRoute.use(json());

// for parsing application/x-ww-form-urlencoded
authRoute.use(urlencoded({ extended: true }));

/* Route for creating account */
authRoute.route('/signup')
  .post(AuthController.signUp);

/* Route for logging in */
authRoute.route('/signin')
  .post(AuthController.signIn);

export default authRoute;
