const constants = require('./bitmap-constants');
const readFrom = require('./read-from');

function getBitmapHeader(file) {
    return readFrom(file, 32)
        .then(buffer => {
            return {
                pixelOffset: buffer.readUInt32LE(constants.PIXEL_OFFSET, 4),
                bitsPerPixel: buffer.readUInt32LE(constants.BITS_PER_PIXEL_OFFSET, 4),
                fileSize: buffer.readUInt32LE(constants.FILE_SIZE_OFFSET, 4)
            };
        });
}

module.exports = getBitmapHeader;
