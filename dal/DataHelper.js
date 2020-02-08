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
        //TODO leverage lean operation
        return this.#model.find(filter).sort(DataHelper.generateSortString(sortBy, sortOrder)).exec();
    }

    findById(id) {
        //TODO leverage lean operation
        return this.#model.findById(id).exec();
    }

    delateById(id) {
        return this.#model.findByIdAndDelete(id);
    }

    updateById(id, fields) {
        return this.#model.findByIdAndUpdate(id, {$set: {...fields}})
    }

}

module.exports = DataHelper;
