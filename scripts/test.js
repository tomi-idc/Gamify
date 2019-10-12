process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../gamify-server/server')
chai.use(chaiHttp);
let should = chai.should();
const expect = require('chai').expect;

// MARK Authentication
describe('Authentication', () => {
    beforeEach((done) => {
        done();
    });
    describe('/POST /api/token', () => {
        it('it should get an OK result', (done) => {
            let data = {
                idToken: "TEST_AUTH"
            }
            chai.request(server)
                .post('/api/token')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/POST /api/create_user', () => {
        it('it should get an OK result', (done) => {
            let data = {
                id: "TEST_AUTH",
                email: "test@test.com"
            }
            chai.request(server)
                .post('/api/create_user')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/POST /api/sign_in', () => {
        it('it should get an OK result', (done) => {
            let data = {
                id: "TEST_AUTH"
            }
            chai.request(server)
                .post('/api/sign_in')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/POST /api/sign_out', () => {
        it('it should get an OK result', (done) => {
            let data = {
                id: "TEST_AUTH"
            }
            chai.request(server)
                .post('/api/sign_out')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });
})



// MARK Categories
describe('Categories', () => {
    beforeEach((done) => {
        done();
    });
    describe('/GET /api/get_games', () => {
        it('it should have an array of items', (done) => {
            chai.request(server)
                .get('/api/get_games')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    res.body.should.have.property('items')
                    done();
                });
        });
    });

    describe('/GET /api/get_category', () => {
        it('it should fail with wrong category ID', (done) => {
            chai.request(server)
                .get('/api/get_category/dgdfgdfgdfg')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('fail')
                    done();
                });
        });
    });

    describe('/GET /api/get_category', () => {
        it('it should pass list of items', (done) => {
            chai.request(server)
                .get('/api/get_category/HTwHVEhKW7ksac7CqEAG')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    res.body.should.have.property('items')
                    done();
                });
        });
    });

    describe('/GET /api/search', () => {
        it('it should find at least 1 result', (done) => {
            chai.request(server)
                .get('/api/search/mario')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('result').eql('ok')
                    res.body.should.have.property('items')
                    expect(res.body.items.length).to.be.above(0)
                    done()
                });
        });
    });

    describe('/GET /api/search', () => {
        it('it should find at least no results', (done) => {
            chai.request(server)
                .get('/api/search/fsdfsdfsdfd')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('result').eql('ok')
                    res.body.should.have.property('items')
                    expect(res.body.items.length).to.be.equal(0)
                    done()
                });
        });
    });
})



// MARK Cart
describe('Cart', () => {
    beforeEach((done) => {
        done();
    });
    describe('/PUT /api/add_to_cart', () => {
        it('it should return OK', (done) => {
            chai.request(server)
                .put('/api/add_to_cart/TEST_AUTH/0APzcqZiGsTTaTm8wNao')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/PUT /api/add_to_cart', () => {
        it('it should return OK', (done) => {
            chai.request(server)
                .put('/api/add_to_cart/TEST_AUTH/0APzcqZiGsTTaTm8wNao')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/DELETE /api/remove_from_cart', () => {
        it('it should try to remove a non-existing item and return OK', (done) => {
            chai.request(server)
                .delete('/api/remove_from_cart/TEST_AUTH/AAAAAAAAA')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/PUT /api/decrement_from_cart', () => {
        it('it should return OK', (done) => {
            chai.request(server)
                .put('/api/decrement_from_cart/TEST_AUTH/0APzcqZiGsTTaTm8wNao')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/GET /api/get_cart', () => {
        it('it should have one item', (done) => {
            chai.request(server)
                .get('/api/get_cart/TEST_AUTH')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    res.body.should.have.property('items')
                    expect(res.body.items.length).to.be.equal(1)
                    done();
                });
        });
    });

    describe('/POST /api/buy_products', () => {
        it('it should return OK', (done) => {
            chai.request(server)
                .post('/api/buy_products')
                .send({
                    user_id: "TEST_AUTH",
                    items: [{ id: "0APzcqZiGsTTaTm8wNao", quantity: 1 }]
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/GET /api/get_cart', () => {
        it('it should have 0 items', (done) => {
            chai.request(server)
                .get('/api/get_cart/TEST_AUTH')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    res.body.should.have.property('items')
                    expect(res.body.items.length).to.be.equal(0)
                    done();
                });
        });
    });
})



// MARK Wishlist
describe('Wishlist', () => {
    beforeEach((done) => {
        done();
    });

    describe('/PUT /api/add_to_wishlist', () => {
        it('it should return OK', (done) => {
            chai.request(server)
                .put('/api/add_to_wishlist/TEST_AUTH/0APzcqZiGsTTaTm8wNao')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/PUT /api/add_to_wishlist', () => {
        it('it should return OK', (done) => {
            chai.request(server)
                .put('/api/add_to_wishlist/TEST_AUTH/bLRLQetzaHNlFg3xrpGz')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/POST /api/remove_from_wishlist', () => {
        it('it should return OK', (done) => {
            chai.request(server)
                .post('/api/remove_from_wishlist/TEST_AUTH')
                .send({ id: "bLRLQetzaHNlFg3xrpGz" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    done();
                });
        });
    });

    describe('/GET /api/get_wishlist', () => {
        it('it should return a list with 1 item', (done) => {
            chai.request(server)
                .get('/api/get_wishlist/TEST_AUTH')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('ok')
                    expect(res.body.items.length).to.be.equal(1)
                    done();
                });
        });
    });
});



// MARK Admin
describe('Admin', () => {
    beforeEach((done) => {
        done();
    });

    describe('/POST /api/get_activities', () => {
        it('it should fail because user is not admin', (done) => {
            chai.request(server)
                .get('/api/get_activities/false')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('fail')
                    done();
                });
        });
    });

    describe('/POST /api/get_activities', () => {
        it('it should fail because user is not admin', (done) => {
            chai.request(server)
                .get('/api/get_activities')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').eql('fail')
                    done();
                });
        });
    });

    describe('/POST /api/get_activities', () => {
        it('it should pass with a list of at least 1 item', (done) => {
            chai.request(server)
                .get('/api/get_activities/true')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('result').eql('ok')
                    res.body.should.have.property('items')
                    expect(res.body.items.length).to.be.above(0)
                    done()
                });
        });
    });
});