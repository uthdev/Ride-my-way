import express from 'express';
import { json, urlencoded } from 'body-parser';
import UserController from '../../controllers/UserController';
import { ensureAutheticated } from '../../middleware/auth/authMiddleware';

const userRoute = express();

// for parsing application/json
userRoute.use(json());

// for parsing application/x-ww-form-urlencoded
userRoute.use(urlencoded({ extended: true }));

/* Route for creating account */
userRoute.route('/:id')
  .get(ensureAutheticated, UserController.fetchUser);

userRoute.route('/current/user')
  .get(ensureAutheticated, UserController.fetchCurrentUser);

export default userRoute;
