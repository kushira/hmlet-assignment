const supertest = require('supertest'),
    mongoose = require('mongoose'),
    app = require('../server'),
    UUID = require('uuid');

const request = supertest(app);

describe('user route tests', function () {

    it('should upload a photo', async function () {
        const userId = UUID.v4();
        const res = await request
            .post('/users/'.concat(userId).concat('/photos'))
            .field('caption', 'John Smith')
            .attach('photo', './test/test-image.jpg');
        res.status.should.equal(200);
        res.body.id.should.not.be.undefined();
        res.body.fileLocation.should.not.be.undefined();
    });

});
