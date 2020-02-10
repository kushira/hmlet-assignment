const {FILE_PATH} = require('../config'),
    DataHelper = require('../dal/PhotoDataHelper'),
    {EXTENSIONS} = require('../util/file.type.util'),
    {isValidSortOrder, ASC} = require('../domain/sort.order.constant'),
    {isValidType} = require('../domain/photo.type.constant'),
    {moveFile} = require('../util/file.operation.util'),
    UUID = require('uuid');

const UserPhotoDataHelper = new DataHelper('UserPhoto');

const CAPTION_REGEX = /#([a-zA-Z0-9-]*)/g;
const SORT_FIELDS = ['publishedDate'];
const PARENT_PATH = 'photos';

const savePhoto = async ({userId, caption, type, photoName, fileLocation, fileType}) => {
    validatePhotoType(type);

    const photoId = UUID.v4();
    const fileExtension = EXTENSIONS[fileType];
    const newFileLocation = generateFilePath(userId, photoId, type, fileExtension);
    await moveFile(fileLocation, `${FILE_PATH}${newFileLocation}`);
    const userPhoto = {
        photoId,
        userId,
        caption,
        captionTags: getCaptionTags(caption),
        photoName,
        type,
        fileType: EXTENSIONS[fileType],
        publishedDate: new Date()
    };
    const photoData = await UserPhotoDataHelper.save(userPhoto);
    return {
        id: photoData.id,
        ...userPhoto,
        fileLocation: newFileLocation
    }
};

const getPhotos = async ({userId, type, captionTags, sortBy = 'publishedDate', sortOrder = ASC}) => {
    validatePhotoType(type);
    if (!SORT_FIELDS.includes(sortBy)) {
        throw new Error('Unsupported sort by field');
    }
    if (!isValidSortOrder(sortOrder)) {
        throw new Error('Invalid sort order');
    }

    const filter = {userId};
    if (type) {
        filter.type = type;
    }
    if (captionTags) {
        filter.captionTags = captionTags;
    }

    const photos = await UserPhotoDataHelper.find({filter, sortBy, sortOrder});
    return photos.map(photo => extractPhotoData(photo));
};

const deletePhoto = id => UserPhotoDataHelper.delateById(id);

const updateCaption = async ({photoId, caption}) => {
    await UserPhotoDataHelper.updateById(photoId, {
        caption,
        captionTags: getCaptionTags(caption)
    });

    const photo = await UserPhotoDataHelper.findById(photoId);
    return extractPhotoData(photo);
};

function validatePhotoType(type) {
    if (type) {
        if (!isValidType(type)) {
            throw new Error('Invalid photo type');
        }
    }
}

function extractPhotoData(photo) {
    return {
        id: photo.id,
        fileLocation: generateFilePath(photo.userId, photo.photoId, photo.type, photo.fileType),
        caption: photo.caption,
        type: photo.type,
        publishedDate: photo.publishedDate,
        photoName: photo.photoName,
        captionTags: photo.captionTags
    }
}

function generateFilePath(userId, photoId, type, fileType) {
    return `/${PARENT_PATH}/${type}/${userId}/${photoId}.${fileType}`;
}

function getCaptionTags(caption) {
    const tags = [];
    const matchingGroups = caption.matchAll(CAPTION_REGEX);
    if (matchingGroups) {
        for (const match of matchingGroups) {
            tags.push(match[1]);
        }
    }

    return tags;
}

module.exports = {
    SORT_FIELDS,
    deletePhoto,
    getPhotos,
    savePhoto,
    updateCaption
};
