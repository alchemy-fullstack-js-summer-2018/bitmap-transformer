const constants = require('./bitmap-constants.js');
const readFrom = require('./read-from');

function getBitmapHeader(file) {
    const header = {};
    return readFrom(file, 4, constants.PIXEL_OFFSET)
        .then(buffer => {
            return header.pixelOffset = buffer.readInt32LE(0);
        });
}

module.exports = getBitmapHeader;
