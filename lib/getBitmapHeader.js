const properties = require('./bitmap-constants');
const readFrom = require('./read-from');

function getBitmapHeader(file) {
    let headerObject = {};
    return readFrom(file, 4, properties.PIXEL_OFFSET) 
        .then(buffer => {
            headerObject.pixelOffset = buffer.readInt32LE(0);
            return readFrom(file, headerObject.pixelOffset, 0);
        })
        .then(header => {
            headerObject.fileSize = header.readInt32LE(properties.FILE_SIZE_OFFSET);
            headerObject.bitsPerPixel = header.readInt16LE(properties.BITS_PER_PIXEL_OFFSET);
            return headerObject;
        });
}
module.exports = getBitmapHeader;