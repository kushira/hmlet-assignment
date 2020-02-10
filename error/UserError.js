const HmletError = require('./HmletError');

class UserError extends HmletError {
    constructor(message, detailMessage) {
        super(message, detailMessage);
    }
}

module.exports = UserError;

