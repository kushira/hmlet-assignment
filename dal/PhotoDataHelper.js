const DataHelper = require('./DataHelper');

class PhotoDataHelper extends DataHelper {

    constructor(modelName) {
        super(modelName);
    }

    find({filter, sortBy, sortOrder}) {
        //TODO leverage lean operation
        if (filter.captionTags) {
            filter.captionTags = {$all: filter.captionTags};
        }
        return this.model.find(filter).sort(DataHelper.generateSortString(sortBy, sortOrder)).exec();
    }

}

module.exports = PhotoDataHelper;
