const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const ride = require('../app/models/ride');
const server = require('../server');
should = chai.should();
assert = chai.assert;

chai.use(chaiHttp);

describe('Rides', () => {
    beforeEach((done) => {
        ride.remove({}, (err) => {
            done(err);
        })
    });

    describe('/GET ride', () => {
        it('should get all rides', (done) => {
            chai.request(server)
                .get('/rides')
                .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        })
    });

    describe('/POST ride', () => {
        it('should add a new ride', (done) => {
            const ride = {
               title: 'A ride by me',
               description: 'Another one from me'
            };
            chai.request(server)
                .post('/rides')
                .send(ride)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                })
        });
    });

    describe('/DELETE:id ride', () => {
        it('should delete a particular ride given the id', (done) => {
            const myRide = new ride({
                title: 'Another ride by me too',
                description: 'This is my second book'
            });
            chai.request(server)
                .del('/rides/' + myRide._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

    });

});


