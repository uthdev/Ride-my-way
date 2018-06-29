import dbPool from '../config/dbConnection';

/**
 * @description Checks if User data a correct
 * @param {Object} userDetails
 * @param {Object} res
 */
export const isUserDetailsValid = (userDetails, res) => {
  const fname = (userDetails.fname.trim() !== '') ? userDetails.fname :
    res.status(400).json({
      error: 'First name cannot be empty',
    });
  const lname = (userDetails.lname.trim() !== '') ? userDetails.lname :
    res.status(400).json({
      error: 'Last name cannot be empty',
    });
  const email = (userDetails.email.trim() !== '') ? userDetails.email :
    res.status(400).json({
      error: 'Email is required',
    });
  const phone = (userDetails.phone.trim() !== '' && userDetails.phone.length === 11) ? userDetails.phone :
    res.status(400).json({
      error: 'Phone number invalid(Phone number cannot be less  than 11 digits or greater',
    });
  const password = (userDetails.password.trim() !== '' && userDetails.password >= 6) ? userDetails.password :
    res.status(400).json({
      error: 'Password cannot be empty or Less than 6 characters',
    });
  const cPassword = (userDetails.password.trim() === userDetails.cPassword.trim()) ?
    userDetails.password :
    res.status(400).json({
      error: 'Password does not match',
    });
  const address = (userDetails.address.trim() !== '') ? userDetails.address : res.status(400).json({
    error: 'Address field is required',
  });
  const zip = (userDetails.zip > 0) ? userDetails.zip : res.status(400).json({
    error: 'Zip code is required',
  });

  return (fname && lname && email && phone && password && cPassword && address && zip);
};

/**
 * @descriptionChecks if User is alrady existing
 * @param {string} userEmail
 */
export const isUserExisting = (userEmail, res) => {
  let isExisting = false;
  dbPool.query(`SELECT email FROM users WHERE email = '${userEmail}'`)
    .then((response) => {
      console.log(response.rows.email.trim());
      isExisting = response.rowCount > 0;
    }).catch(e => console.log(e.stack));
  return isExisting;
};
