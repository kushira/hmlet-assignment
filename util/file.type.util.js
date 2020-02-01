const JPEG = 'image/jpeg';
const JPG = 'image/jpg';
const PNG = 'image/png';

const MIME_TYPES = [JPEG, JPG, PNG];
const EXTENSIONS = {};

EXTENSIONS[JPEG] = '.jpg';
EXTENSIONS[JPG] = '.jpeg';
EXTENSIONS[PNG] = '.png';

module.exports = {
    MIME_TYPES,
    EXTENSIONS
};

