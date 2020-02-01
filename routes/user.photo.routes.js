const Router = require('@koa/router'),
    multer = require('@koa/multer');

const {MIME_TYPES} = require('../util/file.type.util'),
    UserPhotoApi = require('../api/user.photo.api');

const upload = multer({
    dest: 'uploads', fileFilter: function (req, file, next) {
        const {mimeType} = file;
        //TODO Configurations
        if (!MIME_TYPES.includes(file.mimetype)) {
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
    if (!file || !body.caption) {
        throw new Error('File or caption cannot be null');
    }

    console.log(file.path);

    ctx.body = await UserPhotoApi.savePhoto({
        userId: userId,
        caption: body.caption,
        photoName: file.originalname,
        fileType: file.mimetype,
        fileLocation: file.path
    });
});

module.exports = router;


