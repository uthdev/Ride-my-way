import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isUserDetailsValid, isUserValid } from '../helpers/authHelpers';
import { error, success, failure } from '../helpers/helpers';
import dbPool from '../config/dbConnection';
import dbConfig from '../config/databaseConfig';
import { createNewUser, find } from '../helpers/queryHelpers';

/**
 * @class UserContoller
 * @description Handles user signup and login
 */
class AuthController {
  /**
   * @description Create a new user account
   * @param {Object} req
   * @param {Object} res
   */
  static signUp(req, res, done) {
    const { errorCode, errorMsg } = isUserDetailsValid(req.body, res, done);
    if (!errorMsg) {
      const email = req.body.email.trim();
      const firstName = req.body.firstName.trim();
      const hashedPassword = bcrypt.hashSync(req.body.password.trim(), 8);

      /* check if email address is already existing */
      return dbPool.query(find('email', 'users', 'email', email), (err, response) => {
        if (err) {
          return error(res, 500, 'Error establishing database connection');
        }
        if (response.rowCount > 0) {
          return failure(res, 400, 'A user with this email address already exist');
        }

        const values = [
          firstName, req.body.lastName,
          email, req.body.phone,
          hashedPassword, req.body.address,
          req.body.city, req.body.zipCode, 'NOW()',
        ];

        // callback
        dbPool.query(createNewUser, values, (err, result) => {
          if (err) {
            return error(res, 500, 'Something went while trying to create your account');
          }
          const results = result && result.rows[0];
          const token = jwt.sign(
            { id: results.id },
            dbConfig.secret,
            { expiresIn: 86400 },
          );
          delete results.password;
          return success(res, 201, { message: 'Your account was created successfully', token, results });
        });
        return null;
      });
    }
    return error(res, errorCode, errorMsg);
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @method signIn Logs a user into the application
   * @description allows users to log in to the application
   */
  static signIn(req, res) {
    /* Grab the email addres and password from the request body */
    const { errorCode, errorMsg } = isUserValid(req.body);
    const { email, password } = req.body;

    if (!errorMsg) {
      /* Search for user */
      return dbPool.query(find('*', 'users', 'email', email), (err, user) => {
        if (err) {
          error(res, 500, 'Could not connect to the database server');
        }
        if (user.rowCount > 0) {
          const userInfo = user.rows[0];
          const token = jwt.sign(
            { id: userInfo.id },
            dbConfig.secret,
            { expiresIn: 84000 },
          );

          if (bcrypt.compareSync(password, userInfo.password.trim())) {
            delete userInfo.password;
            return success(res, 200, { message: 'User login successfull', token, userInfo });
          }
          return failure(res, 400, 'Username or password is not correct');
        }
        return failure(res, 404, 'Could not find any user matching your request');
      });
    }
    return error(res, errorCode, errorMsg);
  }
}


export default AuthController;

