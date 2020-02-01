const Koa = require('koa'),
    Router = require('@koa/router'),
    mongoose = require('mongoose');

//TODO Configuration
mongoose.connect('mongodb://localhost:27017/hmlet', {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(error => {
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

app.use(router.routes());
app.use(router.allowedMethods());
app.use(UserRoutes.routes());
app.use(UserRoutes.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

//TODO Configuration
const server = app.listen(3000);

module.exports = server;