const DataHelper = require('../dal/DataHelper'),
    {POST, DRAFT} = require('../domain/photo.type.constant'),
    {EXTENSIONS} = require('../util/file.type.util'),
    {moveFile} = require('../util/file.operation.util'),
    UUID = require('uuid');

const UserPhotoDataHelper = new DataHelper('UserPhoto');

const savePhoto = async ({userId, caption, photoName, fileLocation, fileType}) => {
    const photoId = UUID.v4();
    //TODO Configurations
    const newFileLocation = `store/photos/${userId}/${photoId}${EXTENSIONS[fileType]}`;
    await moveFile(fileLocation, newFileLocation);
    const photoData = await UserPhotoDataHelper.save({
        photoId,
        userId,
        caption,
        photoName,
        type: POST,
        publishedDate: new Date()
    });
    return {
        id: photoData.id,
        photoId,
        userId,
        caption,
        photoName,
        type: POST,
        publishedDate: photoData.publishedDate,
        fileLocation: newFileLocation
    }
};

module.exports = {
    savePhoto
};
