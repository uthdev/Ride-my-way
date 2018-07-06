
/**
 * @description Checks if User data a correct
 * @param {Object} userDetails
 * @param {Object} res
 * @returns {Boolean} true or false expecting true
 */
export const isUserDetailsValid = (userDetails) => {
  /* Name variable declarration */
  const errorCode = 400;
  let errorMsg;

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    address,
    city,
    zipCode,
  } = userDetails;


  /* Check for first name */
  if (!firstName || firstName.trim() === '' && ((typeof firstName) !== 'string')) {
    errorMsg = 'First name is required.';
  }

  /* check if last name is valid */
  if (!lastName || lastName.trim() === '' && typeof (lastName !== 'string')) {
    errorMsg = 'Last name is required.';
  }


  /* Validate email */
  /* regular expression for testing email address */
  let emailRegex = /[^\s]*@[a-z0-9.-]*/i;
  /* test email address */
  emailRegex = emailRegex.test(String(email).toLowerCase());

  if (!emailRegex) {
    errorMsg = 'Invalid Email Address';
  }

  /* Check for phone number  */
  if (!phone || phone.trim() === '' && (typeof phone !== 'string')) {
    errorMsg = 'Phone cannot be empty';
  }

  /* Check for password */
  if (!password || password.trim().length < 6 && (typeof password !== 'string')) {
    errorMsg = 'Password cannot be less than six characters';
  }

  /* check if password is matching  */
  if (!confirmPassword || confirmPassword !== password) {
    errorMsg = 'Password does not match';
  }

  /* check for address  */
  if (!address || address.trim() === '' && (typeof address !== 'string')) {
    errorMsg = 'Address field cannot be empty';
  }

  /* Check for city */
  if (!city || city.trim() === '' && typeof (city !== 'string')) {
    errorMsg = 'City is empty or invalid';
  }

  /* Check for zipCode */
  if (!zipCode || zipCode.trim() === '' && (typeof (zipCode !== 'string'))) {
    errorMsg = 'Zip Code is required';
  }
  console.log(errorMsg);

  return { errorCode, errorMsg };
};

/**
 * @description Checks if User is alrady existing
 * @param {string} data
 */
export const isUserValid = (data) => {
  const { email, password } = data;
  const errorCode = 400;
  let errorMsg;

  /* regular expression for testing email address */
  let emailRegex = /[^\s]*@[a-z0-9.-]*/i;
  /* test email address */
  emailRegex = emailRegex.test(String(email).toLowerCase());
  if (!emailRegex) {
    errorMsg = 'Email or password is incorrect';
  }

  /* Check for password */
  if (!password || typeof password !== 'string') {
    errorMsg = 'Email or password is incorrect';
  }

  return { errorCode, errorMsg };
};
