const app = {};
let currentUserId = '';
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

app.geCurrentUser = () => parseInt(localStorage.getItem('id'), 10);

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
app.getFormData = (form) => {
  // const form = form.getElementsByTagName('form')[0];
  const inputs = form.getElementsByTagName('input');

  const formData = {};
  for (let i = 0; i < inputs.length;
    (i += 1)) {
    formData[inputs[i].name] = inputs[i].value;
  }
  return formData;
};
app.logIn = (data) => {
  app.saveToken(data.data.token);
  app.currentUserId();
  setTimeout(() => {
    window.location = 'summary.html';
    return null;
  }, 1500);
};
app.isRequestValid = (data, callBack) => {
  const errMsg = document.querySelector('.js__errMsg');
  if (data.status === 'fail') {
    errMsg.textContent = `* ${data.data.message}`;
    return errMsg;
  }
  if (data.status === 'error') {
    errMsg.textContent = `* ${data.message}`;
    return errMsg;
  }
  if (data.status === 'success') {
    errMsg.style.color = '#78c078';
    errMsg.textContent = `* ${data.data.message}, You will be redirected shortly`;

    return callBack(data);
  }
  return null;
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = app.getFormData(form);
    const formdata = JSON.stringify(formData);
    app.authUser('/api/v1/auth/signup', formdata).then(data => app.isRequestValid(data, app.logIn))
    // eslint-disable-next-line
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = app.getFormData(form);
    const formdata = JSON.stringify(formData);
    app.authUser('/api/v1/auth/signin', formdata).then(data => app.isRequestValid(data, app.logIn))
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

app.post = (url, authToken, formData, requestMethod) => {
  const requestHeader = {
    method: requestMethod, // *GET, POST, PUT, DELETE, etc
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  return fetch(url, requestHeader)
    .then(response => response.json()) // parses response to JSON
    // eslint-disable-next-line
    .catch(error => console.error('Fetch Error =\n', error));
};

app.authRedirect = (time, location) => {
  window.location.href = location;
};

app.loadAllRideOffers = () => {
  const alertMsg = document.querySelector('.alert > span');
  const rideSearchResult = document.getElementById('js__ride__search__result');
  app.fetch('/api/v1/rides', localStorage.getItem('token')).then((data) => {
    if (data.status === 'fail') {
      alertMsg.innerHTML = data.data.message;
      app.authRedirect(1000, 'signin.html');
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
        return null;
      });
    }
  });
};

app.getSingleRide = () => {
  const rideOfferId = window.location.search.split('')[1];
  app.fetch(`/api/v1/rides/${rideOfferId}`, localStorage.getItem('token')).then((data) => {
    if (data.status === 'fail') {
      // alertMsg.innerHTML = data.data.message;
      app.authRedirect(0, 'signIn.html');
    }
    if (data.status === 'success') {
      // alertMsg.innerHTML = data.data.message;
      // console.log(data);
      // let phone = ''
      app.fetch(`/api/v1/profile/${data.data.rideOffer.rideOwnerId}`, localStorage.getItem('token')).then((user) => {
        // if (user.status === 'fail') {
        //   // alertMsg.innerHTML = data.data.message;
        //   // app.authRedirect(0);
        //   document.write('Could not find this user');
        // }
        if (user.status === 'success') {
          const rideHeader = document.querySelector('.RideInfo__header');
          const {
            phone, firstName, lastName,
          } = user.data.user;
          const rideOfferHeading = `<div class="RideInfo__header__img text--center">
            <img src="${(user.data.user.profile) ? user.data.user.profile : 'assets/img/dummy.jpg'}" alt="offerer profile">
            <h4 class="text--primary">${data.data.rideOffer.rideTitle}</h4>
            <h5 class="text--color--grey font--regular">${(data.data.rideOffer.rideOwnerId === parseInt(localStorage.getItem('id'), 10)) ? 'You' : (`${lastName} ${firstName}`)}</h5>
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
            <a class="btn btn--block DashboardColor--bg--primary btn--round margin--top--10 text--center" href="riderequest.html?${data.data.rideOffer.id}">View requests</a>
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
        return app.sendRideRequest();
      });
    }
  });
};
app.currentUserId = () => app.fetch('/api/v1/profile/current/user', localStorage.getItem('token')).then((currentUser) => {
  currentUserId = currentUser.data.currentUser.id;
  return localStorage.setItem('id', currentUserId);
});
app.getUserRidesCount = () => {
  const rideRecievedId = document.getElementById('js__RideRecieved');
  const ridesOfffered = document.getElementById('js__RideOffered');
  app.fetch(`/api/v1/rides/owner/${app.geCurrentUser()}`, localStorage.getItem('token')).then((data) => {
    if (data.status === 'fail') {
      // alertMsg.innerHTML = data.data.message;
      ridesOfffered.attributes['0'] = `findride.html?${app.geCurrentUser()}`;
      ridesOfffered.children['0'].innerHTML = 0;
    }
    if (data.status === 'success') {
      ridesOfffered.attributes['0'] = `findride.html?${app.geCurrentUser()}`;
      ridesOfffered.children['0'].innerHTML = data.data.rideOffer.length;
    }
  });
  app.fetch('/api/v1/users/rides/recieved', localStorage.getItem('token')).then((rideRecieved) => {
    if (rideRecieved.status === 'fail') {
      rideRecievedId.attributes['0'] = `findride.html?${app.geCurrentUser()}`;
      rideRecievedId.children['0'].innerHTML = 0;
    }
    if (rideRecieved.status === 'success') {
      rideRecievedId.attributes['0'] = `findride.html?${app.geCurrentUser()}`;
      rideRecievedId.children['0'].innerHTML = rideRecieved.data.riderequests.length;
    }
  });
};

app.createRideOffer = () => {
  app.fetch('/api/v1/profile/current/user', localStorage.getItem('token')).then((currentUser) => {
    app.fetch(`/api/v1/profile/${currentUser.data.currentUser.id}`, localStorage.getItem('token')).then((user) => {
      const { profile, id } = user.data.user;
      const profileImage = document.querySelector('.profile');
      // const rideOwnerId = parseInt(id, 10);
      const rideOwnerIdInput = document.querySelector("input[type='hidden']");
      rideOwnerIdInput.value = id;

      // console.log({ profileImage });
      profileImage.attributes['0'].nodeValue = (profile) || 'assets/img/dummy.jpg';
      // (profile) || 'assets/img/dummy.jpg';
    });
  });

  const form = document.getElementsByTagName('form')[0];
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = app.getFormData(form);

    app.post('/api/v1/users/rides', localStorage.getItem('token'), formData, 'POST').then((data) => {
      const createOffer = () => setTimeout(() => {
        window.location = 'findride.html';
        return null;
      }, 1500);
      return app.isRequestValid(data, createOffer);
    }) // JSON from `response.json()` call
      // eslint-disable-next-line
      .catch(error => console.error(error));
  });
};
/* Fetch all ride offers */
app.sendRideRequest = () => {
  const form = document.querySelector('.RideForm');
  const rideOfferId = window.location.search.split('')[1];
  app.fetch(`/api/v1/rides/${rideOfferId}`, localStorage.getItem('token')).then((data) => {
    localStorage.setItem('rideOwnerId', data.data.rideOffer.rideOwnerId);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(localStorage.getItem('id'));
    app.post(`/api/v1/rides/${rideOfferId}/requests`, localStorage.getItem('token'), { rideOwnerId: localStorage.getItem('rideOwnerId') }, 'POST').then((rideRequest) => {
      const rideRequestHandler = () => app.authRedirect(1000, 'summary.html');
      app.isRequestValid(rideRequest, rideRequestHandler);
    });
  });
};


app.getRideRequests = () => {
  const rideOfferId = window.location.search.split('')[1];
  console.log(rideOfferId);
  const rideRequestBody = document.querySelector('.RideRequest');
  app.fetch(`api/v1/users/rides/${rideOfferId}/requests`, app.getToken()).then((rideRequests) => {
    console.log(rideRequests);
    // console.log(rideRequests);
    if (rideRequests.status === 'fail') {
      rideRequestBody.innerHTML = `<div class="RideDetails light--shadow">
          
              <div class="RideDetail__header">
                
                <div class="RideInfo__content  margin--top--10 padding--40">
          

        <div class="ride__seats text--center">
          <h3 class="DashboardColor--text--grey">No Request For This Ride
          </h3>
        </div>
        
        
          </div>
              </div>
            </div>`;
    } else {
      rideRequests.data.riderequests.map((rideRequest) => {
        console.log(rideRequest);
        app.fetch(`/api/v1/rides/${rideRequest.rideId}`, localStorage.getItem('token')).then((data) => {
          console.log(data);
          // if (data.data.rideOffer.rideOwnerId !== app.geCurrentUser()) {
          //   // alertMsg.innerHTML = data.data.message;
          //   app.authRedirect(0, 'summary.html');
          // }
          if (data.status === 'success') {
            const {
              rideTitle, destination, location, id,
            } = data.data.rideOffer;
            app.fetch(`/api/v1/profile/${rideRequest.passengerId}`, localStorage.getItem('token')).then((requestingUser) => {
              if (requestingUser.status === 'success') {
                console.log(requestingUser);

                const {
                  phone, firstName, lastName, profile,
                } = requestingUser.data.user;
                const request = `
                <div class="RideDetails light--shadow">
                  <div class="RideDetail__header">
                    <div class="RideInfo__header">
                      <div class="RideInfo__header__img text--center">
                        <img src="${profile || 'assets/img/dummy.jpg'}" alt="offerer profile">
                        <h4 class="text--primary">${rideTitle}</h4>
                        <h5 class="text--color--grey font--regular">${firstName} ${lastName} wants to join you</h5>
                      </div>
                    </div>
                    <div class="RideInfo__content text--center margin--top--10">
                      <div class="text--color--grey">${location}</div>
                      <div>
                        <i class="fas fa-arrow-down text--primary margin--10"></i>
                      </div>
                      <div class="text--color--grey">${destination}</div>
                      <div class="RideForm">
                        <form>
                          <div>
                          <input type='hidden' name='status' value='accepted' />
                            <button type="submit" class="DashboardBtn btn--round DashboardColor--bg--primary margin--top--10">Accept</button>
                          </div>
                        </form>
                        <form>
                          <div>
                            <input type='hidden' name='status' value='rejected' />
                            <button type="submit" class="DashboardBtn btn--round DashboardColor--bg--grey margin--top--10">Decline</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                `;
                rideRequestBody.innerHTML += request;
                const forms = Array.from(rideRequestBody.getElementsByTagName('form'));
                forms.map((form) => {
                  form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = app.getFormData(form);
                    app.post(`/api/v1/users/rides/${id}/requests/${rideRequest.id}`, app.getToken(), formData, 'PUT').then((result) => {
                      console.log(result);
                      const rideRequestHandler = () => app.authRedirect(1000, 'findride.html');
                      app.isRequestValid(result, rideRequestHandler);
                    });
                  });
                });
              }
            });
          }
        });
      });
    }
  });
};

app.loadRideHistory = () => {
  app.fetch('api/v1/profile/current/history', app.getToken()).then((ridehistory) => {
    const { histories } = ridehistory.data;
    const rideHistory = document.querySelector('.js__RideHistory');
    if (histories.length < 1) {
      rideHistory.innerHTML = '<h1>No History</h1>';
    }
    histories.map((history) => {
      const {
        status, location, destination, rideTitle,
        createdAt,
      } = history;

      const [year, month, day] = createdAt.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      rideHistory.innerHTML += `
      <div class="row ">
        <div class="Ride__date">
          <!-- <h5>Nov</h5> -->
          <h6 class="DashboardColor--text--grey">${months[month - 1]}</h6>
          <p class="DashboardColor--text--grey">${day.slice(0, 2)}</p>
        </div>
        <div class="Rider__name">
          <h6>
            <a href="#">You</a>
          </h6>
          <p class="DashboardColor--text--grey">
            <em>
              <strong>${status ? 'Joined' : 'Offered'}:</strong>
            </em> ${rideTitle} </p>
        </div>
        <div class="ride__destination">
          <h6 class="DashboardColor--text--grey">
            <em>From: </em>${location}
            <br>
            <em>To: </em>${destination}
          </h6>
        </div>
      </div>
      `;
    });
  });
};
// Get the navbar
const navbar = document.querySelector('nav');


// Get the offset position of the navbar
const sticky = 1;

// When the user scrolls the page, execute myFunction
window.onscroll = () => ((window.pageYOffset >= sticky) ? navbar.classList.add('sticky') : navbar.classList.remove('sticky'));
