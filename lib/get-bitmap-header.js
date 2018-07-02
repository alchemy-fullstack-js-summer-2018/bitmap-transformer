const constants = require('./bitmap-constants');
const readFrom = require('./read-from');

function getBitmapHeader(file) {
    const headerObj = {};
    return readFrom(file, 4, constants.PIXEL_OFFSET)
        .then(bufferObj => {
            headerObj.pixelOffset = bufferObj.readInt32LE(0);
            return readFrom(file, headerObj.pixelOffset, 0);
        })
        .then(header => {
            headerObj.fileSize = header.readInt32LE(constants.FILE_SIZE_OFFSET);
            headerObj.bitsPerPixel = header.readInt16LE(constants.BITS_PER_PIXEL_OFFSET);
            return headerObj;
        });
}

module.exports = getBitmapHeader;
