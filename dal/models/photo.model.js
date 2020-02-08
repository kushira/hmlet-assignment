const mongoose = require('mongoose');

const {EXTENSIONS} = require('../../util/file.type.util');
const {POST, DRAFT} = require('../../domain/photo.type.constant');

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    photoId: {
        type: String,
        unique: true
    },
    caption: {
        type: String,
    },
    captionTags: [{
        type: String,
    }],
    type: {
        type: String,
        enum: [POST, DRAFT],
        required: true
    },
    fileType: {
        type: String,
        enum: Object.values(EXTENSIONS),
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    photoName: {
        type: String
    },
});

PhotoSchema.index({captionTags: 1});

module.exports = PhotoSchema;
