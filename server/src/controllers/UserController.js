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
class UserController {
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
          return failure(res, 403, 'A user with this email address already exist');
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
            error(res, 500, 'Something went while trying to create your account');
          }
          const results = result.rows[0];
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

  static signIn(req, res) {
    /* Grab the email addres and password from the request body */
    const { errorCode, errorMsg } = isUserValid(req.body);
    const { email, password } = req.body;

    if (!errorMsg) {
      /* Search for user */
      dbPool.query(find('*', 'users', 'email', email), (err, user) => {
        if (err) {
          error(res, 500, 'Could not connect to the database server');
        }
        if (user.rowCount > 0) {
          const userInfo = user.rows[0];
          const token = jwt.sign(
            { id: userInfo.id },
            dbConfig.secret,
            { expiresIn: 86400 },
          );

          if (bcrypt.compareSync(password, userInfo.password.trim())) {
            delete userInfo.password;
            success(res, 200, { message: 'User login successfull', token, userInfo });
          }
        } else {
          failure(res, 404, 'Could not find any user matching your request');
        }
      });
    } else {
      return error(res, errorCode, errorMsg);
    }

    /* Return validation error */
    return null;
  }
}


export default UserController;

