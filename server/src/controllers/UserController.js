import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isUserDetailsValid } from '../helpers/authHelpers';
import { error, success } from '../helpers/rideHelpers';
import dbPool from '../config/dbConnection';
import dbConfig from '../config/databaseConfig';

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
  static signUp(req, res) {
    if (isUserDetailsValid(req.body, res)) {
      const email = req.body.email.trim();
      const fname = req.body.fname.trim();
      const hashedPassword = bcrypt.hashSync(req.body.password.trim(), 8);
      return dbPool.query(`SELECT email FROM users WHERE email = '${email}'`, (err, response) => {
        if (err) {
          res.status(500).json({ message: 'An error occured while processing this request outer' });
        }
        if (response.rowCount > 0) {
          return res.status(403).json({ message: 'Account already exists' });
        }
        // Query string for creating user
        const text = 'INSERT INTO users(fname, lname, email, phone,  password, address) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [
          fname, req.body.lname,
          email, req.body.phone,
          hashedPassword, req.body.address,
          req.body.city, req.body.zipcode,
        ];

        // callback
        return dbPool.query(text, values, (err, result) => {
          const results = result.rows[0];
          if (err) {
            error(res, 500, 'Something went wrong');
          } else {
            const token = jwt.sign(
              { id: results.id },
              dbConfig.secret,
              { expiresIn: 86400 },
            );
            delete results.password;
            success(res, 201, 'Your account was created successfully', { token, results });
          }
        });
      });
    }
    return error(res, 500, 'An error occurred while processing your request');
  }
}


export default UserController;

