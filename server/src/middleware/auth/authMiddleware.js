import jwt from 'jsonwebtoken';
import { failure } from '../../helpers/helpers';
import dbConfig from '../../config/databaseConfig';

export const ensureAutheticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, dbConfig.secret);
    req.userData = decoded;
    next();
  } catch (error) {
    failure(res, 400, { message: 'You are not signed in, please login  or create an account' });
  }
};

export const isAuthorize = (req, res, next) => next();
