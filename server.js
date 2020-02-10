const bodyParser = require('koa-bodyparser'),
    jwt = require('koa-jwt'),
    Koa = require('koa'),
    Router = require('@koa/router'),
    serve = require('koa-static'),
    mongoose = require('mongoose');

const {DB_URL, FILE_PATH, JWT_SHARED_SECRET, PORT} = require('./config'),
    UserError = require('./error/UserError');

//TODO Disable auto index in production
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(error => {
    console.log(error);
    process.exit(-1);
});

//TODO Logger
const app = new Koa(),
    router = new Router();

require('./dal/models');

const UserRoutes = require('./routes/user.photo.routes');

router.get('/', ctx => {
    ctx.body = {message: 'success'};
});

app.use(jwt({secret: JWT_SHARED_SECRET}));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(UserRoutes.routes());
app.use(UserRoutes.allowedMethods());

app.use(serve(`./${FILE_PATH}`));

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

const server = app.listen(PORT);

console.log(`Application is running on ${PORT}`);

module.exports = server;
