const readFrom = require('./readFrom');
const constants = require('./bitmap-constants');

function getBitmapHeader(file) {
    const headerData = {};
    return readFrom(file, 4, constants.PIXEL_OFFSET)
        .then(buffer => {
            headerData.pixelOffset = buffer.readInt32LE(0);
            return readFrom(file, headerData.pixelOffset, 0);
        })
        .then(header => {
            headerData.fileSize = header.readInt32LE(constants.FILE_SIZE_OFFSET);
            headerData.bitsPerPixel = header.readInt32LE(constants.BITS_PER_PIXEL_OFFSET);
            return headerData;
        });
}

module.exports = getBitmapHeader;