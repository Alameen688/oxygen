/* eslint-env mocha */
/* eslint no-unused-vars: 0 */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../dist/server';

/** disabled no-unused-vars for this file
 *  to prevent 'should' from throwing error
 * on this line based on airbnb style guide
 * */
const should = chai.should();

chai.use(chaiHttp);

const newEntry = {
  title: 'Setting up testing',
  content: `I've heard about testing before but never had a reason to take it so serious
    until the bootcamp challenge came in.`,
};

const invalidEntries = [
  {
    title: 'Only has title'
  },
  {
    content: 'Only has content'
  }
];


let id = "";

/**
 * TEST THE POST ENPOINT
 */
describe('/POST entries', () => {
  it('should create a new entry', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .send(newEntry)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('should return an error when any required property is not passed', (done) => {
    /** generate random number between 0 and 1, 1 inclusive**/
    let i = Math.floor(Math.random() * 1);
    //select an entry to use at random (from one without content, one without title)
    let invalidEntry = invalidEntries[i];
    chai.request(server)
      .post('/api/v1/entries')
      .send(invalidEntry)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.status.should.equal('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('array');
        done();
      })
  });

});

/**
 * TEST THE, GET ALL ENPOINT
 */
describe('/GET entries', () => {
  it('should get all the entries', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.a('object');
        done();
      });
  });
});

/**
 * TEST THE, GET BY ID ENPOINT
 */
describe('/GET/:id entries', () => {
  it('should get an entry by a given id', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .send(newEntry)
      .end((err, res) => {
        chai.request(server)
          .get(`/api/v1/entries/${res.body.data.id}`)
          .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.data.should.be.a('object');
            done();
          });
      });
  });
});

/**
 * TEST THE PUT ENPOINT
 */
describe('/PUT/:id entries', () => {
  it('should update an entry by a given id', (done) => {
    const entryUpdate = {
      title: 'Setting up testing (update)',
      content: `I've heard about testing before but never had a reason to take it so serious
        until the Andela circle 34 bootcamp challenge came in.`,
    };

    chai.request(server)
      .post('/api/v1/entries')
      .send(newEntry)
      .end((err, res) => {
        id = res.body.data.id;
        chai.request(server)
          .put(`/api/v1/entries/${res.body.data.id}`)
          .send(entryUpdate)
          .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.data.should.be.a('object');
            done();
          });
      });
  });

  it('should return an error when any required property is not passed', (done) => {
    let i = Math.floor(Math.random() * 1);
    let invalidEntry = invalidEntries[i];
    chai.request(server)
      .put(`/api/v1/entries/${id}`)
      .send(invalidEntry)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.status.should.equal('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('array');
        done();
      })
  });
});

/**
 * TEST AN INVALID ENPOINT 
 */
describe('Invalid endpoint request', () => {
  it('should return a 404 error with an error message', (done) => {
    chai.request(server)
      .get('/api/v1/entri')
      .end((err, res) => {
        res.body.should.have.property('status');
        res.body.status.should.equal('error');
        done();
      });
  });
});
