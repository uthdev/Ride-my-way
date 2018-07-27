import fs from 'fs';
import { error, parsedInt, success, failure } from '../helpers/helpers';
import dbPool from '../config/dbConnection';
import { find } from '../helpers/queryHelpers';
import { cloudinaryConfig, uploader } from '../config/cloudinary/cloudinaryConfig';
import multerUploads from '../config/multer/multerConfig';


/**
 * @class UserController
 * @description HORles all request to the user's information
 */
class UserController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @description fetches the user info with from the params
   */
  static fetchUser(req, res) {
    const { id } = req.params;
    const parsedId = parsedInt(id);
    // console.log('from request', req.userData);


    /* Check if id is  a Not a number */
    if (!(Number.isInteger(parsedId))) {
      return error(res, 400, 'User is invalid');
    }
    return dbPool.query(find('*', 'users', 'id', parsedId), (err, result) => {
      if (err) {
        return error(res, 500, 'Error connecting the database');
      }

      if (result.rowCount > 0) {
        const user = result.rows[0];
        delete user.password;
        return success(res, 200, { message: 'user info', user });
      }
      return failure(res, 404, "User wasn't found");
    });
  }

  static updateProfile(req, res, next) {
    multerUploads(req, res, (err) => {
      if (err) {
        return error(res, 500, 'Error connecting the database');
      }
      const {
        firstName, lastName, phone, email, address, city, zipCode,
      } = req.body;

      cloudinaryConfig();
      // cloudinaryConfig()/;object
      if (req.file) {
        uploader.upload(
          req.file.path
          , (result) => {
            const profile = result.url;
            dbPool.query(`UPDATE users SET profile ='${profile}', "firstName"='${firstName}', "lastName"='${lastName}', phone='${phone}', email='${email}', address='${address}', city='${city}', "zipCode"='${zipCode}' WHERE id='${req.userData.id}' RETURNING *;`, (err, res) => ((err) ? error(res, 500, 'Error connecting the database') : null));
            // eslint-disable-next-line
            fs.unlink(req.file.path, err => ((err) ? console.log(err) : console.log('file deleted successfully')));
          },
        );
        return success(res, 200, { message: 'Profile updated successfully' });
      }
    });
  }

  static fetchCurrentUser(req, res) {
    if (req.userData) {
      const currentUser = req.userData;
      return success(res, 200, { message: 'User is logged in', currentUser });
    }
    return null;
  }
  static fetchRideHistory(req, res) {
    let { id } = req.userData;
    id = parsedInt(id);
    // console.log(id);
    /* Check if id is  a Not a number */
    if (!(Number.isInteger(id))) {
      return error(res, 400, 'User is invalid');
    }
    return dbPool.query(`SELECT *
    FROM rideoffers, riderequests WHERE(rideoffers.id = riderequests."rideId" AND riderequests."passengerId" ='${id}' AND riderequests.status ='accepted') `, (err, rideHistory) => {
      if (err) {
        // console.log(err.stack);
        return error(res, 500, 'Could not establish database connection');
      }
      if (rideHistory.rowCount <= 0) {
        return success(res, 404, { message: 'No ride history found' });
      }
      const history = rideHistory.rows;
      return dbPool.query(`SELECT * FROM rideoffers  WHERE(rideoffers."rideOwnerId"=${id})`, (err, offers) => {
        if (err) {
          // console.log(err.stack);
          return error(res, 500, 'Could not establish database connection');
        }
        if (offers.rowCount <= 0) {
          return null;
        }
        const histories = [...history, ...offers.rows];
        return success(res, 200, { message: 'Your ride history', histories });
      });
    });
  }
}


export default UserController;
