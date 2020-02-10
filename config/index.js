const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/hmlet';
const FILE_PATH = process.env.FILE_PATH || 'store';
const JWT_SHARED_SECRET = 'shared-secret';

module.exports = {
    DB_URL,
    FILE_PATH,
    JWT_SHARED_SECRET,
    PORT
};