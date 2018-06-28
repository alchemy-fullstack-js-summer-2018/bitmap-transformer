const constants = require('./bitmap-constants');

module.exports = class BitmapHeader {
    constructor(buffer) {
        this.buffer = buffer;
        this.pixelOffset = this.findPixelOffset(constants.PIXEL_OFFSET);
        this.bitsPerPixel = this.findBitsPerPixel(constants.BITS_PER_PIXEL);
        this.fileSize = this.findFileSize(constants.FILE_SIZE_OFFSET);
    }
    // File size loop
    findPixelOffset(constant) {
        return this.buffer.readInt32LE(constant);
    }

    findBitsPerPixel(constant) {
        return this.buffer.readInt16LE(constant);
    }

    findFileSize(constant) {
        return this.buffer.readInt32LE(constant);
    }
};