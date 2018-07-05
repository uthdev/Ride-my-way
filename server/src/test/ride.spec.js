import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';

import app from '../index';
import { user1 } from './tokens';

/* Test all ride actions */


chai.use(chaiHtpp);
describe('Test For Ride Routes', () => {
  /* All ride offers */
  describe('/GET api/v1/rides', () => {
    it('should return all ride offers', (done) => {
      chai.request(app)
        .get('/api/v1/rides')
        .set('Authorization', user1)
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  /* test invalid ride offer id */
  describe('Test for single ride offer id', () => {
    it('should return a ride offers', (done) => {
      chai.request(app)
        .get('/api/v1/rides/1')
        .set('Authorization', user1)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(parseInt(res.body.data.rideOffer.id, 10)).to.equal(1);
          expect(res.body.data.rideOffer.id).to.be.a('number');
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
        .set('Authorization', user1)
        .end((message, res) => {
          expect(res).to.have.status(404);
          expect(res.body.data.message).to.equal('No ride offer found');
          done();
        });
    });
  });

  // /* test individual ride offer that doesn't exit */
  describe('Test for non existing ride offers', () => {
    it('should not return a ride offers', (done) => {
      chai.request(app)
        .get('/api/v1/rides/abcd')
        .set('Authorization', user1)
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
        .set('Authorization', user1)
        .end((message, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Ride id is invalid');
          done();
        });
    });
  });

  // /* create ride offers */
  describe('/POST api/v1/users/rides', () => {
    it('should create a new ride offer', (done) => {
      const data = {
        rideTitle: 'heading towards surulere',
        location: 'Maryland',
        destination: 'Surulere',
        departureTime: '3-07-2018 4PM',
        rideOwnerId: 2,
        noOfSeat: 4,
        createdAt: '3-07-2018 3PM',
        expiresAt: '3-07-2018 3PM',
      };
      chai.request(app)
        .post('/api/v1/rides/')
        .set('Authorization', user1)
        .send(data)
        .end((message, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });


  /* Request to join ride offers */
  describe('/POST api/v1/rides/<rideId>/requests', () => {
    it('should not  be able to join a ride when fields are incomplete', (done) => {
      const data = {
        rideId: 1,
        passengerId: 1,
      };
      chai.request(app)
        .post('/api/v1/rides/hdhadh/requests')
        .set('Authorization', user1)
        .send(data)
        .end((message, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Ride is invalid');
          done();
        });
    });
  });

  /* should be a able to join a ride */
  /* Request to join ride offers */
  describe('/POST api/v1/rides/<rideId>/requests', () => {
    it('should not  be able to join a ride', (done) => {
      const data = {
        rideId: 1,
        passengerId: 1,
      };
      chai.request(app)
        .post('/api/v1/rides/1/requests')
        .set('Authorization', user1)
        .send(data)
        .end((message, res) => {
          expect(res).to.have.status(403);
          expect(res.body.data.message).to.equal('You have already sent a ride request');
          done();
        });
    });
  });

  /* should not be able to send a ride request twice */
  describe('/POST api/v1/rides/1/requests', () => {
    it('should not  be able to join a ride', (done) => {
      const data = {
        rideId: 1,
        passengerId: 1,
      };
      chai.request(app)
        .post('/api/v1/rides/1/requests')
        .set('Authorization', user1)
        .send(data)
        .end((message, res) => {
          expect(res).to.have.status(403);
          expect(res.body.data.message).to.equal('You have already sent a ride request');
          done();
        });
    });
  });
});

