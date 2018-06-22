# Ride My Way

Ride-my App is a carpooling application that provides drivers with the ability to create ride offers
and passengers to join available ride offers.

# Motivation

This App is a challenge that will contritube greatly to my journey of becoming a world class developer

# Build Status

Build status of continous integration i.e travis, coveralls and codeclimate

[![Build Status](https://travis-ci.org/joeeasy/Ride-my-way.svg?branch=develop)](https://travis-ci.org/joeeasy/Ride-my-way)
[![Coverage Status](https://coveralls.io/repos/github/joeeasy/Ride-my-way/badge.svg?branch=develop)](https://coveralls.io/github/joeeasy/Ride-my-way?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d86c8aa23c4dfe18ba06/maintainability)](https://codeclimate.com/github/joeeasy/Ride-my-way/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d86c8aa23c4dfe18ba06/test_coverage)](https://codeclimate.com/github/joeeasy/Ride-my-way/test_coverage)

## Style guide

[Airbnb ](http://link)(Javascript style guide)
[BEM ](http://link)(CSS style guide)

### Screenshots(UI template)

![alt](./screenshots/dashboard.png)

Preview UI template here[ UI Template](https://joeeasy.github.io/Ride-my-way/UI/)

### Tech Stack

- [Nodejs](http://nodejs.org)
- [Expressjs](http://expressjs.com)
- [Mocha](http://mocha.com)
- [Chai](http://chai.com)

### Features

- User should be able to create account
- User should be able to view all ride offers
- User should be able to see the details of a ride offer and respond to it
- User should be able to offer a ride
- user should be able to view and accept requests for the ride offers he/she has created

## Installing

#### Prerequisites

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

To install this app

```
git clone git@github.com:joeeasy/Ride-my-way.git
```

And install the required dependencies

```
npm install
```

Run server

```
npm run dev
```

Server listens on port `5000`

## Running the tests

To run test cases

```
npm test
```

### Working Routes

<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Functionality</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET /rides</td>
<td>Fetch all ride request for an authenticated user</td>
</tr>
<tr>
<td>GET /users/:requestId</td>
<td>Fetch the details of a specific ride</td>
</tr>
<tr>
<td>POST /users/rides</td>
<td>Creates a new ride offer</td>
</tr>
<tr>
<td>POST /users/:rideId/requests</td>
<td>Sends a request to join a new ride</td>
</tr>
</tbody></table>


## License

This projects is the MIT LICENSE

## Authur

[Jehonadab Okpukoro](http://github.com/joeeasy)
## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Acknowledgments

- [Andela](http://andela.com)
- [Brad Traversy Media](http://youtube.com?s=brad)
- [Google Search](https://google.com)
- [Stackover Flow](stackoverflow.com)
- Hat tip to everybody who supported

### Live demo

You can test
- [Endpoint ](https://ridemw.herokuapp.com/)

