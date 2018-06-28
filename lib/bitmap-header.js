const properties = require('./bitmap-constants');
module.exports = class BitmapHeader {
    constructor(buffer) {
        this.buffer = buffer;
        this.pixelOffset = this.buffer.readInt32LE(properties.PIXEL_OFFSET);
        this.bitsPerPixel = this.buffer.readInt16LE(properties.BITS_PER_PIXEL_OFFSET);
        this.fileSize = this.buffer.readInt32LE(properties.FILE_SIZE_OFFSET);
    }
};