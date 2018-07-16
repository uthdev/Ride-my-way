const app = {};

/**
 * @method saveToken Saves the token on local storage
 * @param {string} token
 */
app.saveToken = token => localStorage.setItem('token', token);

/**
 * @method getToken
 * @description fetches token from local storage
 * @returns token
 */
app.getToken = () => localStorage.getItem('token');

/**
 * @method loadSideBar
 * @description loads hamburger menu once the window loads
 */
app.loadSideBar = () => {
  const btns = Array.from(document.getElementsByClassName('js__navbar__toggler'));
  const navBarCollaspe = document.querySelector('.navbar__collapse');

  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navBarCollaspe.style.display === 'none') {
        navBarCollaspe.style.display = 'block';
      } else {
        navBarCollaspe.style.display = 'none';
      }
    });
  });
};

/* Get data from the form body */
/**
 * @method getFormData
 * @description fetches the data from the form and creates the request body
 * @returns request body || form body
 */
app.getFormData = () => {
  const form = document.getElementsByTagName('form')[0];
  const inputs = form.getElementsByTagName('input');

  const formData = {};
  for (let i = 0; i < inputs.length; (i += 1)) {
    formData[inputs[i].name] = inputs[i].value;
  }
  return formData;
};

/* sign in and signup user helpers */
/**
 * @method authUser
 * @param {string} url
 * @param {string} formData
 * @description allows users to login or sign up
 */
app.authUser = (url, formData) =>
  // Default options are marked with *
  fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc
    headers: {

      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: formData,
  })
    .then(response => response.json()) // parses response to JSON
    // eslint-disable-next-line
    .catch(error => console.error('Fetch Error =\n', error));

/* Createa an account for a new user */
/**
 * @method signUp
 * @description Allows users to create an account
 * @returns user information and auth token and save's it to localstorage
 */
app.signUp = () => {
  const form = document.getElementsByTagName('form')[0];
  const errMsg = document.querySelector('.js__errMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = app.getFormData();
    const formdata = JSON.stringify(formData);
    app.authUser('/api/v1/auth/signup', formdata).then((data) => {
      if (data.status === 'fail') {
        errMsg.textContent = `* ${data.data}`;
      }
      if (data.status === 'error') {
        errMsg.textContent = `* ${data.message}`;
      }
      if (data.status === 'success') {
        errMsg.style.color = '#78c078';
        errMsg.textContent = `* ${data.data.message}, You will be redirected shortly`;

        app.saveToken(data.data.token);
        setTimeout(() => {
          window.location = 'summary.html';
          return null;
        }, 1500);
      }
    }) // eslint-disable-next-line
      .catch(error => console.error(error));
  });
};

/* user sign in  */
/**
 * @method signin
 * @description  Allows users to login to the application
 * @returns user's info and saves the auth token to localstorage
 */
app.signIn = () => {
  const form = document.getElementsByTagName('form')[0];
  const errMsg = document.querySelector('.js__errMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = app.getFormData();
    const formdata = JSON.stringify(formData);
    app.authUser('/api/v1/auth/signin', formdata).then((data) => {
      if (data.status === 'fail') {
        errMsg.textContent = `* ${data.data}`;
      }
      if (data.status === 'error') {
        errMsg.textContent = `* ${data.message}`;
      }
      if (data.status === 'success') {
        errMsg.style.color = '#78c078';
        errMsg.textContent = `* ${data.data.message}, You will be redirected shortly`;
        app.saveToken(data.data.token);
        setTimeout(() => {
          window.location = 'summary.html';
          return null;
        }, 1500);
      }
    }) // JSON from `response.json()` call
    // eslint-disable-next-line
      .catch(error => console.error(error));
  });
};


/* Fetch all ride offers */


// Get the navbar
const navbar = document.querySelector('nav');


// Get the offset position of the navbar
const sticky = 1;

// When the user scrolls the page, execute myFunction
window.onscroll = () => ((window.pageYOffset >= sticky) ? navbar.classList.add('sticky') : navbar.classList.remove('sticky'));
