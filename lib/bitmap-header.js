
const constants = require('./bitmap-constants');
module.exports = class BitmapHeader {
    constructor(buffer) {
        this.buffer = buffer;
        //passing in offsets from constants
        this.pixelOffset = this.pixelOffset(constants.PIXEL_OFFSET);
        this.bitsPerPixel = this.bitsPerPixel(constants.BITS_PER_PIXEL_OFFSET);
        this.fileSize = this.fileSize(constants.FILE_SIZE_OFFSET);
    }
    pixelOffset(offset) {
        //4 bytes in length = readInt32LE (offset 10 bytes in)
        return this.buffer.readInt32LE(offset);
    }
    bitsPerPixel(offset) {
        //2 bytes in length = readInt16LE (offset 28 bytes in)
        return this.buffer.readInt16LE(offset);
    }
    fileSize(offset) {
        //4 bytes in length == readInt32LE (offset 2 bytes in)
        return this.buffer.readInt32LE(offset);
    }
};