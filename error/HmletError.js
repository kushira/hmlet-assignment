class HmletError extends Error {
    detailMessage;

    constructor(message, detailMessage) {
        super(message);
        this.detailMessage = detailMessage;
    }
}

module.exports = HmletError;