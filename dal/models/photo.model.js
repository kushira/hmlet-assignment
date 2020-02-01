const mongoose = require('mongoose');

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
    type: {
        type: String,
        enum: [POST, DRAFT],
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

module.exports = PhotoSchema;
