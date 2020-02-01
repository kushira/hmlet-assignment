const mongoose = require('mongoose');

class DataHelper {

    #model;

    constructor(modelName) {
        this.#model = mongoose.model(modelName);
        if (!this.#model) {
            throw new Error(`Model ${modelName} not found`);
        }
    }

    save(data) {
        const modelData = new this.#model(data);
        return modelData.save();
    }
}

module.exports = DataHelper;
