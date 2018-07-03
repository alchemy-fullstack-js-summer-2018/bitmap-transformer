module.exports = class BitmapHeader {
    constructor(buffer) {
        this.buffer = buffer;
        this.pixelOffset = buffer.readInt8(10);
        this.bitsPerPixel = buffer.readInt8(28);
        this.fileSize = buffer.readInt16LE(2);
    }
};