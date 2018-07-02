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

// const properties = require('./bitmap-constants');
// module.exports = class BitmapHeader {
//     constructor(buffer) {
//         this.buffer = buffer;
//         this.pixelOffset = this.buffer.readInt32LE(properties.PIXEL_OFFSET);
//         this.bitsPerPixel = this.buffer.readInt16LE(properties.BITS_PER_PIXEL_OFFSET);
//         this.fileSize = this.buffer.readInt32LE(properties.FILE_SIZE_OFFSET);
//     }
// };