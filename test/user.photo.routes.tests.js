const jwt = require('jsonwebtoken'),
    supertest = require('supertest'),
    UUID = require('uuid');

const app = require('../server'),
    {JWT_SHARED_SECRET} = require('../config'),
    {DRAFT, POST} = require('../domain/photo.type.constant');

const request = supertest(app);

describe('user route tests', function () {

    after(() => {
        //TODO clean up test data
    });

    it('should upload a photo as a post', async function () {
        const userId = UUID.v4();
        const res = await uploadPhoto(userId, 'John #Smith is #fun', 'post');
        res.status.should.equal(200);
        res.body.id.should.not.be.undefined();
        res.body.type.should.equal(POST);
        res.body.fileLocation.should.not.be.undefined();
    });

    it('should upload a photo as a draft', async function () {
        const userId = UUID.v4();
        const res = await uploadPhoto(userId, 'John #Smith is #fun', 'draft');
        res.status.should.equal(200);
        res.body.id.should.not.be.undefined();
        res.body.type.should.equal(DRAFT);
        res.body.fileLocation.should.not.be.undefined();
    });

    it('should save tags when uploading a photo', async function () {
        const userId = UUID.v4();
        const res = await uploadPhoto(userId, 'John #Smith is #fun', 'post');
        res.status.should.equal(200);
        res.body.id.should.not.be.undefined();
        res.body.fileLocation.should.not.be.undefined();
        res.body.captionTags.should.be.an.Array().and.have.length(2);
    });

    it('should get all photos', async function () {
        const userId = UUID.v4();
        let res = await uploadPhoto(userId, 'John #Smith is #fun', 'post');
        res.status.should.equal(200);
        res = await request
            .get('/users/'.concat(userId).concat('/photos'))
            .set('Authorization', 'bearer ' + getToken());
        res.body.should.be.an.Array().and.have.length(1);
        res.body[0].id.should.not.be.undefined();
        res.body[0].fileLocation.should.not.be.undefined();
        res.body[0].captionTags.should.be.an.Array().and.have.length(2);
    });

    it('should get all photos in published date descending order', async function () {
        const userId = UUID.v4();
        let res = await uploadPhoto(userId, 'John #Smith is #fun', 'post');
        res.status.should.equal(200);
        res = await uploadPhoto(userId, 'John #Smith is #fun', 'post');
        res.status.should.equal(200);
        res = await request
            .get('/users/'.concat(userId).concat('/photos?sort-by=publishedDate&sort-order=desc'))
            .set('Authorization', 'bearer ' + getToken());
        res.body.should.be.an.Array().and.have.length(2);
        res.body[0].publishedDate.should.be.above(res.body[1].publishedDate);
    });

    it('should delete photos by Id', async function () {
        const userId = UUID.v4();
        let res = await uploadPhoto(userId, 'John #Smith is #fun', 'post');
        res.status.should.equal(200);
        const id = res.body.id;
        res = await request
            .delete('/photos/'.concat(id))
            .set('Authorization', 'bearer ' + getToken());
        res.status.should.equal(204);
    });

    it('should update caption by Id', async function () {
        const userId = UUID.v4();
        let res = await uploadPhoto(userId, 'John #Smith is #fun', 'post');
        res.status.should.equal(200);
        const id = res.body.id;
        res = await request
            .patch('/photos/'.concat(id))
            .set('Authorization', 'bearer ' + getToken())
            .send({caption: 'Jenny is #bored'});
        res.status.should.equal(200);
        res.body.captionTags.should.be.an.Array().and.have.length(1);
    });

    it('should search photos by tag', async function () {
        const userId = UUID.v4();
        let res = await uploadPhoto(userId, 'John #Smith is #fun', 'post');
        res.status.should.equal(200);
        res = await uploadPhoto(userId, 'Jane #Smith is #bad', 'post');
        res.status.should.equal(200);
        res = await request
            .get('/users/'.concat(userId).concat('/photos?tags=Smith&tags=bad'))
            .set('Authorization', 'bearer ' + getToken());
        res.body.should.be.an.Array().and.have.length(1);
    });

    function uploadPhoto(userId, caption, type) {
        return request
            .post('/users/'.concat(userId).concat('/photos'))
            .set('Authorization', 'bearer ' + getToken())
            .field('caption', caption)
            .field('type', type)
            .attach('photo', './test/test-image.jpg');
    }

    function getToken() {
        return jwt.sign({name: 'John Doe'}, JWT_SHARED_SECRET);
    }

});
