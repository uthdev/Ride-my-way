import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isUserDetailsValid } from '../helpers/authHelpers';
import { error, success } from '../helpers/rideHelpers';
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
    // console.log(isUserDetailsValid(req.body, res, done));
    const { errorCode, errorMsg } = isUserDetailsValid(req.body, res, done);
    if (!errorMsg) {
      const email = req.body.email.trim();
      const firstName = req.body.firstName.trim();
      const hashedPassword = bcrypt.hashSync(req.body.password.trim(), 8);

      /* check if email address is already existing */
      return dbPool.query(find('email', 'users', 'email', email), (err, response) => {
        if (err) {
          return res.status(500).json({ message: 'An error processing your' });
        }
        if (response.rowCount > 0) {
          return res.status(403).json({ message: 'Account already exists' });
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
          return success(res, 201, 'Your account was created successfully', { token, results });
        });
        return null;
      });
    }
    return error(res, errorCode, errorMsg);
  }
}


export default UserController;

