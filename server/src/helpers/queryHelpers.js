// Query string for creating user
/**
   * @name createAccountQuery
   * @description script to create new user
   *
   */
export const createNewUser = `INSERT INTO 
  users("firstName", "lastName", email, phone,  password, address, city, "zipCode", "createdAt")
 VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9)
  RETURNING *`;

// Query for finding a user by Id
/**
 * @description for finding or more items in a database
 * @param {String} selectedColumn the column you'll like to return
 * @param {String} tableName the name of the table you're selecting from
 * @param {String} columnName  where from client matches data from user
 * @param {String} value the value coming from the client
 */
export const find = (selectedColumn, tableName, columnName, value) => (`SELECT ${selectedColumn} FROM ${tableName} WHERE ${columnName} = '${value}'`);

/* Find all user */
export const findAll = (selectedColumn, tableName) => (`SELECT ${selectedColumn} FROM ${tableName}`);

export const createRideOffer = `INSERT INTO 
  rideoffers("rideTitle", location, destination, "departureTime", "rideOwnerId", 
  "noOfSeats", "createdAt", "startsAt", "expiresAt")
 VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9)
  RETURNING *`;
