const app = require('../app');
const chaiHttp = require('chai-http');
const chai = require('chai');
const should = require('chai').should();
const expect = require('chai').expect;
const mongoose = require('mongoose');
chai.use(chaiHttp);
var agent = chai.request.agent(app)

describe('DATABASE TESTS', () => {
  describe('Connection', () => {
    it('Should connect successfully', done => {
      mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true }, err => {
        should.not.exist(err);

        done();
      })
    })
  })
});

describe('ROUTE TESTS', () => {
  // Run function before each test
  beforeEach(done => done());

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
  });

  describe('Post /user/login', () => {
    it('Should log in existing user and allow posts route', done => {
      agent.post('/users/login')
      .send({ email: 'support@kaizenmedia.co.za', password: 'password' })
      .then((res) => {
        // Make sure we got a cookie
        should.exist(res.request.cookies);
        res.should.redirect;

        agent.get('/posts').then(res => {
          res.should.have.status(200);
          done();
        });
      })
      .catch(e => {
        console.log(e);
        done();
      })
    })
  });

  describe('Post Pages Middlewares', () => {
    it('Should have an auth check', done => {
      let requester = chai.request(app).keepOpen();

      Promise.all([
        requester.get('/posts'),
        requester.get('/posts/new'),
        requester.get('/posts/edit/1'),
      ])
      .then(responses => {
        responses.forEach(response => {
          expect(response).to.redirect;
        })        
      })
      .catch(e => {
        e.should.not.exist;
        console.log(e);
      })
      .then(() => {
        requester.close(() => void done())
      })
      .catch(e => {
        e.should.not.exist;
        console.log(e);
      })
    })
  });

  describe('None existent post pages', () => {
    it('Should redirect to /posts', done => {
      agent.post('/users/login')
      .send({ email: 'support@kaizenmedia.co.za', password: 'password' })
      .then(() => {
        agent.get('/posts/1').then(res => {
          res.should.redirect;
          agent.close();
          done();
        });
      })
      .catch(e => {
        console.log(e);
        e.should.not.exist;
        done();
      })
    })
  })
})