const Router = require('@koa/router'),
    multer = require('@koa/multer');

const {ASC} = require('../domain/sort.order.constant'),
    {isValidType, POST} = require('../domain/photo.type.constant'),
    {MIME_TYPES} = require('../util/file.type.util'),
    UserPhotoApi = require('../api/user.photo.api');

const upload = multer({
    dest: 'uploads', fileFilter: function (req, file, next) {
        const {mimetype} = file;
        //TODO Configurations
        if (!MIME_TYPES.includes(mimetype)) {
            return next(null, false);
        }

        next(null, true);
    }
});

const router = new Router();

router.param('userId', (userId, ctx, next) => {
    ctx.userId = userId;
    return next();
});

router.post('/users/:userId/photos', upload.single('photo'), async ctx => {
    const {file, body} = ctx.request;
    const userId = ctx.userId;

    if (!file || !body.caption || !body.type) {
        throw new Error('File or caption cannot be null');
    }

    ctx.body = await UserPhotoApi.savePhoto({
        userId: userId,
        caption: body.caption,
        type: body.type,
        photoName: file.originalname,
        fileType: file.mimetype,
        fileLocation: file.path
    });
});

router.get('/users/:userId/photos', async ctx => {
    const {body, query} = ctx.request;
    const userId = ctx.userId;

    const type = query.type || POST;

    ctx.body = await UserPhotoApi.getPhotos({
        userId: userId,
        sortBy: query['sort-by'],
        sortOrder: query['sort-order'],
        type
    });

});

module.exports = router;


