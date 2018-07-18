const app = {};

/**
 * @method saveToken Saves the token on local storage
 * @description Saves the authorization token to local storage
 * @param {string} token
 */
app.saveToken = token => localStorage.setItem('token', token);

/**
 * @method getToken get the authorization token
 * @description fetches token from local storage
 * @returns token
 */
app.getToken = () => localStorage.getItem('token');

/**
 * @method loadSideBar responsible for the behaviour of the menu on mobile
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
 * @method getFormData get the form data as an object in form of a key value pair
 * @description fetches the data from the form and creates the request body
 * @returns request body || form body
 */
app.getFormData = () => {
  const form = document.getElementsByTagName('form')[0];
  const inputs = form.getElementsByTagName('input');

  const formData = {};
  for (let i = 0; i < inputs.length;
    (i += 1)) {
    formData[inputs[i].name] = inputs[i].value;
  }
  return formData;
};

/* sign in and signup user helpers */
/**
 * @method authUser creates or signs a user in
 * @param {string} url the api endpoint to fetch
 * @param {string} formData request body
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
 * @method signUp creates an account and logs users in afterward
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
 * @method signin logs users into the application
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
app.fetch = (url, authToken) => {
  const requestHeader = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, requestHeader)
    .then(response => response.json()) // parses response to JSON
    // eslint-disable-next-line
    .catch(error => console.error('Fetch Error =\n', error));
};
app.authRedirect = (time) => {
  setTimeout(() => {
    window.location.href = 'signin.html';
  }, time);
};

app.loadAllRideOffers = () => {
  const alertMsg = document.querySelector('.alert > span');
  const rideSearchResult = document.getElementById('js__ride__search__result');
  app.fetch('/api/v1/rides', localStorage.getItem('token')).then((data) => {
    if (data.status === 'fail') {
      alertMsg.innerHTML = data.data.message;
      app.authRedirect();
    }
    if (data.status === 'success') {
      alertMsg.innerHTML = data.data.message;
      // console.log(data);
      data.data.rideOffers.map((rideOffer) => {
        rideSearchResult.innerHTML += `
        <div class="RideDetails light--shadow">
          <div class="RideDetail__header">
            <div class="RideInfo__content text--center margin--top--10">
              <div class="text--color--grey">
                <i class="fas fa-map-marker-alt"></i> ${rideOffer.location}</div>
              <div>
                <i class="fas fa-arrow-down text--primary margin--10 bounce"></i>
              </div>
              <div class="text--color--grey">
                <i class="fas fa-map-marker-alt text--primary"></i> ${rideOffer.destination}
              </div>
              <div class="ride__seats">
                <h6 class="DashboardColor--text--grey">Available Seats:
                  <span class="text--primary">${rideOffer.noOfSeats}</span>
                </h6>
              </div>
              <div>
                  <a href='ridedetails.html?${rideOffer.id}' style='display:inherit' class="DashboardBtn btn--round DashboardColor--bg--primary margin--top--10">Join</a>
                </div>
            </div>
          </div>
        </div>
        `;
      });
    }
  });
};

app.getSingleRide = () => {
  const rideOfferId = window.location.search.split('')[1];
  app.fetch(`/api/v1/rides/${rideOfferId}`, localStorage.getItem('token')).then((data) => {
    if (data.status === 'fail') {
      // alertMsg.innerHTML = data.data.message;
      app.authRedirect(0);
    }
    if (data.status === 'success') {
      // alertMsg.innerHTML = data.data.message;
      // console.log(data);
      // let phone = '';
      app.fetch(`/api/v1/profile/${data.data.rideOffer.rideOwnerId}`, localStorage.getItem('token')).then((user) => {
        if (user.status === 'fail') {
          // alertMsg.innerHTML = data.data.message;
          app.authRedirect(0);
        }
        if (user.status === 'success') {
          const rideHeader = document.querySelector('.RideInfo__header');
          const { phone } = user.data.user;
          const rideOfferHeading = `<div class="RideInfo__header__img text--center">
            <img src="${(user.data.user.profile) ? user.data.user.profile : 'assets/img/dummy.jpg'}" alt="offerer profile">
            <h4 class="text--primary">${data.data.rideOffer.rideTitle}</h4>
            <h5 class="text--color--grey font--regular">${user.data.user.firstName} ${user.data.user.lastName}</h5>
            <h4 class="DashboardColor--text--grey">Phone:
            <span class="text--primary">${phone}</span>
          </h4>
          </div>`;
          rideHeader.innerHTML = rideOfferHeading;
        }
      });
      const rideOfferContent = document.querySelector('.RideInfo__content');
      const rideOfferBody = `
      <div class="direction">
      <div class="text--color--grey margin--0">
        <strong>Location:</strong> ${data.data.rideOffer.location}</div>
      <div>
        <i class="fas fa-arrow-right text--primary"></i>
      </div>
      <div class="text--color--grey">
        <strong>Destination:</strong> ${data.data.rideOffer.destination}</div>
    </div>
  
    <div class="ride__seats">
      <h6 class="DashboardColor--text--grey">Available Seats:
        <span class="text--primary">${data.data.rideOffer.noOfSeats}</span>
      </h6>
    </div>
    
    
      `;
      rideOfferContent.innerHTML = rideOfferBody;
      app.fetch('/api/v1/profile/current/user', localStorage.getItem('token')).then((currentUser) => {
        if (currentUser) {
          // eslint-disable-next-line
          return (currentUser.data.currentUser.id === data.data.rideOffer.rideOwnerId) ? (
            rideOfferContent.innerHTML += `<div class="view__rideoffers">
            <a class="btn btn--block DashboardColor--bg--primary btn--round margin--top--10 text--center" href="riderequest.html">View ride offers</a>
          </div>`) : (
            rideOfferContent.innerHTML += `<form action="/summary.html" class="RideForm">
            <div>
              <button type="submit" class="DashboardBtn btn--round DashboardColor--bg--primary margin--top--10">Join ride</button>
            </div>
            <div>
              <button type="submit" class="DashboardBtn btn--round DashboardColor--bg--grey margin--top--10">Cancel</button>
            </div>
          </form>`
          );
        }
      });
    }
  });
};

/* Fetch all ride offers */


// Get the navbar
const navbar = document.querySelector('nav');


// Get the offset position of the navbar
const sticky = 1;

// When the user scrolls the page, execute myFunction
window.onscroll = () => ((window.pageYOffset >= sticky) ? navbar.classList.add('sticky') : navbar.classList.remove('sticky'));
