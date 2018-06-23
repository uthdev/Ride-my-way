import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';

import app from '../index';
/* Test all ride actions */

chai.use(chaiHtpp);
describe('Test For Ride Routes', () => {
  /* All ride offers */
  describe('/GET api/v1/rides', () => {
    it('should return all ride offers', (done) => {
      chai.request(app)
        .get('/api/v1/rides')
        .end((message, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'is an object with an array of rides');
          expect(res.body.data.length).to.equals(5);
          done();
        });
    });
  });

  /* test invalid ride offer id */
  describe('Test for single ride offer id', () => {
    it('should return a ride offers', (done) => {
      chai.request(app)
        .get('/api/v1/rides/1')
        .end((message, res) => {
          expect(res).to.have.status(200);
          expect(parseInt(res.body.data.id, 10)).to.equal(1);
          expect(res.body.data.id).to.be.a('number');
          assert.isObject(res.body, 'is an object containing the ride details');
          done();
        });
    });
  });

  /* valid character but not availiable */
  describe('Check for invalid ride Id', () => {
    it('should a not found message', (done) => {
      chai.request(app)
        .get('/api/v1/rides/1333')
        .end((message, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('The ride offer you requested does not exist');
          done();
        });
    });
  });

  /* test individual ride offer that doesn't exit */
  describe('Test for non existing ride offers', () => {
    it('should not return a ride offers', (done) => {
      chai.request(app)
        .get('/api/v1/rides/abcd')
        .end((message, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Ride id is invalid');
          done();
        });
    });
  });

  /* Should not parse any id with alphabetic characters */
  describe('Test for id with alphabet', () => {
    it('should not parseInt if Id has alphabet', (done) => {
      chai.request(app)
        .get('/api/v1/rides/123abcd')
        .end((message, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Ride id is invalid');
          done();
        });
    });
  });

  /* create ride offers */
  describe('/POST api/v1/rides', () => {
    it('should create a new ride offer', (done) => {
      const data = {
        name: 'suen',
        location: 'Maryland',
        destination: 'Surulere',
        departureTime: '3-07-2018 4PM',
        price: 200,
        createdAt: '3-07-2018 3PM',
        expiresAt: '3-07-2018 3PM',
      };
      chai.request(app)
        .post('/api/v1/rides/')
        .send(data)
        .end((message, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('New ride offer has been created');
          done();
        });
    });
  });

  /* create ride offers */
  describe('Test for missing fields on a new ride request', () => {
    it('should not create an offer when a field is missing', (done) => {
      const data = {
        name: '',
        location: 'Maryland',
        destination: 'Surulere',
        departureTime: '3-07-2018 4PM',
        price: 200,
        createdAt: '3-07-2018 3PM',
        expiresAt: '3-07-2018 3PM',
      };
      chai.request(app)
        .post('/api/v1/rides/')
        .send(data)
        .end((message, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Please enter the missing fields');
          done();
        });
    });
  });

  /* Request to join ride offers */
  describe('/POST api/v1/rides/<rideId>/requests', () => {
    it('should be able to join a ride when fields are complete', (done) => {
      const data = {
        id: 1,
        seats: 1,
      };
      chai.request(app)
        .post('/api/v1/rides/2/requests')
        .send(data)
        .end((message, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Ride request sent');
          done();
        });
    });
  });

  /* Request to join ride offers */
  describe('Test join ride when field is not complete', () => {
    it('should not join a ride when fields are empty', (done) => {
      const data = {
        id: 1,
        seats: 0,
      };
      chai.request(app)
        .post('/api/v1/rides/2/requests')
        .send(data)
        .end((message, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Invalid request token');
          done();
        });
    });
  });

  /* Request to join ride offers */
  describe('Test join ride requested seats is more than the available seats', () => {
    it('should not join a ride when available seats are less than the requested', (done) => {
      const data = {
        id: 1,
        seats: 10,
      };
      chai.request(app)
        .post('/api/v1/rides/2/requests')
        .send(data)
        .end((message, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Your cannot join this ride the passengers are already complete');
          done();
        });
    });
  });
});
