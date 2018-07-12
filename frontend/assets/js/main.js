const app = {};

app.loadSideBar = () => {
  const btns = Array.from(document.getElementsByClassName('js__navbar__toggler'));
  const navBarCollaspe = document.querySelector('.navbar__collapse');

  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (navBarCollaspe.style.display === 'none') {
        navBarCollaspe.style.display = 'block';
      } else {
        navBarCollaspe.style.display = 'none';
      }
    });
  });
};

/* sign in and signup user helpers */
app.authuUser = (url, formData) =>
// Default options are marked with *
  fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc
    headers: {
    // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTMxMzE0OTc5LCJleHAiOjE1MzEzOTg5Nzl9.ygYphH_SlLiPJ6O_TCT2LJ85MjRemBvd7GZw02M3Cbc',
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: formData,
  })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error('Fetch Error =\n', error));

app.signUp = () => {
  const form = document.getElementsByTagName('form')[0];
  const errMsg = document.querySelector('.js__errMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.getElementsByTagName('input');

    const formData = {};
    for (let i = 0; i < inputs.length; i++) {
      formData[inputs[i].name] = inputs[i].value;
    }
    const formdata = JSON.stringify(formData);
    app.authuUser('/api/v1/auth/signup', formdata).then((data) => {
      console.log(data);
      if (data.status === 'fail') {
        errMsg.textContent = `* ${data.data}`;
      }
      if (data.status === 'error') {
        errMsg.textContent = `* ${data.message}`;
      }
      if (data.status === 'success') {
        errMsg.style.color = '#78c078';
        errMsg.textContent = `* ${data.data.message}, You will be redirected shortly`;
        setTimeout(() => (window.location = 'summary.html'), 1500);
      }
    }) // JSON from `response.json()` call
      .catch(error => console.error(error));
  });
};

/* user sign in  */
app.signIn = () => {
  const form = document.getElementsByTagName('form')[0];
  const errMsg = document.querySelector('.js__errMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.getElementsByTagName('input');

    const formData = {};
    for (let i = 0; i < inputs.length; i++) {
      formData[inputs[i].name] = inputs[i].value;
    }
    const formdata = JSON.stringify(formData);
    app.authuUser('/api/v1/auth/signin', formdata).then((data) => {
      console.log(data);
      if (data.status === 'fail') {
        errMsg.textContent = `* ${data.data}`;
      }
      if (data.status === 'error') {
        errMsg.textContent = `* ${data.message}`;
      }
      if (data.status === 'success') {
        errMsg.style.color = '#78c078';
        errMsg.textContent = `* ${data.data.message}, You will be redirected shortly`;
        setTimeout(() => (window.location = 'summary.html'), 1500);
      }
    }) // JSON from `response.json()` call
      .catch(error => console.error(error));
  });
};


// Get the navbar
const navbar = document.querySelector('nav');


// Get the offset position of the navbar
const sticky = 5;
console.log(sticky);

// When the user scrolls the page, execute myFunction
window.onscroll = () => ((window.pageYOffset >= sticky) ? navbar.classList.add('sticky') : navbar.classList.remove('sticky'));
