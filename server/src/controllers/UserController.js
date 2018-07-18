import { error, parsedInt, success, failure } from '../helpers/helpers';
import dbPool from '../config/dbConnection';
import { find } from '../helpers/queryHelpers';

/**
 * @class UserController
 * @description Handles all request to the user's information
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

  static fetchCurrentUser(req, res) {
    if (req.userData) {
      const currentUser = req.userData;
      return success(res, 200, { message: 'User is logged in', currentUser });
    }
    return null;
  }
}

export default UserController;
