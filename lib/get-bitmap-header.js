const constants = require('./bitmap-constants.js');
const readFrom = require('./read-from');

function getBitmapHeader(file) {
    const header = {};
    return readFrom(file, 4, constants.PIXEL_OFFSET)
        .then(buffer => {
            header.pixelOffset = buffer.readInt32LE(0);
            return readFrom(file, header.pixelOffset, 0);
        });
}

module.exports = getBitmapHeader;
