const constants = require('./bitmap-constants');
module.exports = class BitmapHeader {
    constructor(buffer) {
        this.buffer = buffer;
        this.pixelOffset = this.pixelOffsetValue(constants.PIXEL_OFFSET);
        this.bitsPerPixel = this.bitsPerPixelValue(constants.BITS_PER_PIXEL_OFFSET);
        this.fileSize = this.fileSizeValue(constants.FILE_SIZE_OFFSET);
    }

    pixelOffsetValue(offset) {
        return this.buffer.readInt32LE(offset);
    }

    bitsPerPixelValue(offset) {
        return this.buffer.readInt16LE(offset); 
    }

    fileSizeValue(offset) {
        return this.buffer.readInt32LE(offset);
    }
};
    

