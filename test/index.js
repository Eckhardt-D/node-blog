const app = require('../app');
const chaiHttp = require('chai-http');
const chai = require('chai');
const should = require('chai').should();
const mongoose = require('mongoose');
chai.use(chaiHttp);

describe('DATABASE TESTS', () => {
  describe('Connection', () => {
    it('Should connect successfully', done => {
      mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true }, err => {
        should.not.exist(err);

        done();
      })
    })
  })
})

describe('ROUTE TESTS', () => {
  beforeEach(done => done()); // Run function before each test

  describe('Get /', () => {
    it('should Return index view', done => {
      chai.request(app)
      .get('/')
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200);
        res.should.be.html;

        done();
      })
    })
  })
})