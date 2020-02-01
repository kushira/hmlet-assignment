const mongoose = require('mongoose');

const UserPhotoSchema = require('./photo.model');

mongoose.model('UserPhoto', UserPhotoSchema);

