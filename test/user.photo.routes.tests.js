const supertest = require('supertest'),
    UUID = require('uuid');

const app = require('../server'),
    {DRAFT, POST} = require('../domain/photo.type.constant');

const request = supertest(app);

describe('user route tests', function () {

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
            .get('/users/'.concat(userId).concat('/photos'));
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
            .get('/users/'.concat(userId).concat('/photos?sort-by=publishedDate&sort-order=desc'));
        res.body.should.be.an.Array().and.have.length(2);
        res.body[0].publishedDate.should.be.above(res.body[1].publishedDate);
    });

    function uploadPhoto(userId, caption, type) {
        return request
            .post('/users/'.concat(userId).concat('/photos'))
            .field('caption', caption)
            .field('type', type)
            .attach('photo', './test/test-image.jpg');
    }

});
