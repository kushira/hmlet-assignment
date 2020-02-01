const fs = require('fs').promises;

const moveFile = async (originalLocation, newLocation) => {
    await fs.mkdir(newLocation.substring(0, newLocation.lastIndexOf('/')), {recursive: true});
    return fs.rename(originalLocation, newLocation);
};

module.exports = {moveFile};
