'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Test all ride actions */

_chai2.default.use(_chaiHttp2.default);
describe('Test For Ride Routes', function () {
  /* All ride offers */
  describe('/GET api/v1/rides', function () {
    it('should return all ride offers', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/rides').end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(200);
        _chai.assert.isArray(res.body, 'is an array of rides');
        (0, _chai.expect)(res.body.length).to.equals(5);
        done();
      });
    });
  });

  /* test invalid ride offer id */
  describe('Test for single ride offer id', function () {
    it('should return a ride offers', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/rides/1').end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(parseInt(res.body.id, 10)).to.equal(1);
        (0, _chai.expect)(res.body.id).to.be.a('number');
        _chai.assert.isObject(res.body, 'is an object containing the ride details');
        done();
      });
    });
  });

  /* valid character but not availiable */
  describe('Check for invalid ride Id', function () {
    it('should a not found message', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/rides/1333').end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(404);
        (0, _chai.expect)(res.body.message).to.equal('The ride offer you requested does not exist');
        done();
      });
    });
  });

  /* test individual ride offer that doesn't exit */
  describe('Test for non existing ride offers', function () {
    it('should not return a ride offers', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/rides/abcd').end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body.message).to.equal('Ride id is invalid');
        done();
      });
    });
  });

  /* Should not parse any id with alphabetic characters */
  describe('Test for id with alphabet', function () {
    it('should not parseInt if Id has alphabet', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/rides/123abcd').end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body.message).to.equal('Ride id is invalid');
        done();
      });
    });
  });

  /* create ride offers */
  describe('/POST api/v1/rides', function () {
    it('should create a new ride offer', function (done) {
      var data = {
        name: 'suen',
        location: 'Maryland',
        destination: 'Surulere',
        departureTime: '3-07-2018 4PM',
        price: 200,
        createdAt: '3-07-2018 3PM',
        expiresAt: '3-07-2018 3PM'
      };
      _chai2.default.request(_index2.default).post('/api/v1/rides/').send(data).end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body.message).to.equal('New ride offer has been created');
        done();
      });
    });
  });

  /* create ride offers */
  describe('Test for missing fields on a new ride request', function () {
    it('should not create an offer when a field is missing', function (done) {
      var data = {
        name: '',
        location: 'Maryland',
        destination: 'Surulere',
        departureTime: '3-07-2018 4PM',
        price: 200,
        createdAt: '3-07-2018 3PM',
        expiresAt: '3-07-2018 3PM'
      };
      _chai2.default.request(_index2.default).post('/api/v1/rides/').send(data).end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body.error).to.equal('Please enter the missing fields');
        done();
      });
    });
  });

  /* Request to join ride offers */
  describe('/POST api/v1/rides/<rideId>/requests', function () {
    it('should be able to join a ride when fields are complete', function (done) {
      var data = {
        id: 1,
        seats: 1
      };
      _chai2.default.request(_index2.default).post('/api/v1/rides/2/requests').send(data).end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.message).to.equal('Ride request sent');
        done();
      });
    });
  });

  /* Request to join ride offers */
  describe('Test join ride when field is not complete', function () {
    it('should not join a ride when fields are empty', function (done) {
      var data = {
        id: 1,
        seats: 0
      };
      _chai2.default.request(_index2.default).post('/api/v1/rides/2/requests').send(data).end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body.error).to.equal('Invalid request token');
        done();
      });
    });
  });

  /* Request to join ride offers */
  describe('Test join ride requested seats is more than the available seats', function () {
    it('should not join a ride when available seats are less than the requested', function (done) {
      var data = {
        id: 1,
        seats: 10
      };
      _chai2.default.request(_index2.default).post('/api/v1/rides/2/requests').send(data).end(function (error, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body.message).to.equal('Your cannot join this ride the passengers are already complete');
        done();
      });
    });
  });
});