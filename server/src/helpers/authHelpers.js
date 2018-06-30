
/**
 * @description Checks if User data a correct
 * @param {Object} userDetails
 * @param {Object} res
 * @returns {Boolean} true or false expecting true
 */
export const isUserDetailsValid = (userDetails, res) => {
  const firstName = (userDetails.firstName.trim() !== '') ? userDetails.firstName :
    res.status(400).json({
      status: 'fail',
      message: 'First name cannot be empty',
    });
  const lastName = (userDetails.lastName.trim() !== '') ? userDetails.lastName :
    res.status(400).json({
      error: 'Last name cannot be empty',
    });
  const email = (userDetails.email.trim() !== '') ? userDetails.email :
    res.status(400).json({
      error: 'Email is required',
    });
  const phone = (userDetails.phone.trim() !== '') ? userDetails.phone :
    res.status(400).json({
      error: 'Phone number invalid(Phone number cannot be less  than 11 digits or greater',
    });
  const password = (userDetails.password.trim() !== '' && userDetails.password.length >= 6) ? userDetails.password :
    res.status(400).json({
      error: 'Password cannot be empty or Less than 6 characters',
    });
  const confirmPassword = (userDetails.password.trim() === userDetails.confirmPassword.trim()) ?
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

  return (firstName && lastName && email && phone && password && confirmPassword && address && zip);
};

/**
 * @description Checks if User is alrady existing
 * @param {string} data
 */
export const isUserValid = (data, res) => {
  const email = (data.email.trim() !== '') ? data.email : res.status(400).json({
    error: 'Email not valid',
  });
  const password = (data.password.trim() !== '') ? data.password : res.status(400).json({ error: 'Password is required' });

  return email && password;
};
