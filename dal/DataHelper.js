const mongoose = require('mongoose');

const {ASC, DESC} = require('../domain/sort.order.constant');

class DataHelper {

    #model;

    static generateSortString(sortBy, sortOrder) {
        if (sortOrder === DESC) {
            return '-'.concat(sortBy);
        }

        return sortBy;
    }

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

    find({filter, sortBy, sortOrder}) {
        return this.#model.find(filter).sort(DataHelper.generateSortString(sortBy, sortOrder)).exec();
    }

}

module.exports = DataHelper;
