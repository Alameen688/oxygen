import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../dist/server';

let should = chai.should();

chai.use(chaiHttp);

describe('/GET entries', () => {
	it('should Get all the entries', (done) => {
		chai.request(server)
			.get('/api/v1/entries')
			.end((err, res) => {
				res.body.status.should.have(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(2);
			});
	});
});