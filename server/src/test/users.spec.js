import chai, { assert, expect } from 'chai';
import chaiHtpp from 'chai-http';

import app from '../index';

/* Test all ride actions */


chai.use(chaiHtpp);
describe('Test users signup routes', () => {
  /* Allows a user to create an account */
  describe('/GET api/v1/auth/signup', () => {
    it('users should be able to create an account', (done) => {
      const data = {
        firstName: 'trust',
        lastName: 'jamine',
        phone: '07059972180',
        email: 'joek@gmail.com',
        password: 'joeeasy',
        confirmPassword: 'joeeasy',
        address: '42 montgomery',
        city: 'Yaba',
        zipCode: '101212',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(data)
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.message).to.equal('Your account was created successfully');
          done();
        });
    });
  });
  /* user can't sign up when he has already created an account */
  describe('/GET api/v1/auth/signup', () => {
    it('users should not be able to create an account twice', (done) => {
      const data = {
        firstName: 'trust',
        lastName: 'jamine',
        phone: '07059972180',
        email: 'joek@gmail.com',
        password: 'joeeasy',
        confirmPassword: 'joeeasy',
        address: '42 montgomery',
        city: 'Yaba',
        zipCode: '101212',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(data)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.data).to.equal('A user with this email address already exist');
          done();
        });
    });
  });
  /* user shouldn't be able to create an account if his details is not valid */
  describe('/GET api/v1/auth/signup', () => {
    it('users cannot create an account when credentials are not complete', (done) => {
      const data = {
        firstName: '',
        lastName: 'jamine',
        phone: '07059972180',
        email: 'joek@gmail.com',
        password: 'joeeasy',
        confirmPassword: 'joeeasy',
        address: '42 montgomery',
        city: 'Yaba',
        zipCode: '101212',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(data)
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});

/* User signin */
describe('Test users signin routes', () => {
  /* user can't sign up when he has already created an account */
  describe('/GET api/v1/auth/signin', () => {
    it('users should not be able to login in when wrong credentials are provided', (done) => {
      const data = {
        email: 'joek@gmail.com',
        password: 'joeeas0000y',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(data)
        .end((error, res) => {
          expect(res).to.have.status(400);
          // expect(res.body.data).to.equal('Username or password is not correct');
          done();
        });
    });
  });
  /* user shouldn't be able to sign when credentials are empty */
  describe('/GET api/v1/auth/signin', () => {
    it('users should not be able to signin when credentials are incomplete', (done) => {
      const data = {
        email: 'joek@gmail.com',
        password: '',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(data)
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  /* Allows a user to create an account */
  describe('/GET api/v1/auth/signin', () => {
    it('users should be able to login account to their account', (done) => {
      const data = {
        email: 'joek@gmail.com',
        password: 'joeeasy',
      };
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(data)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.message).to.equal('User login successfull');
          done();
        });
    });
  });
});

