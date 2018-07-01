import express from 'express';
import { json, urlencoded } from 'body-parser';
import UserController from '../../controllers/UserController';

const userRoute = express();

// for parsing application/json
userRoute.use(json());

// for parsing application/x-ww-form-urlencoded
userRoute.use(urlencoded({ extended: true }));

/* Route for creating account */
userRoute.route('/signup')
  .post(UserController.signUp);


export default userRoute;
