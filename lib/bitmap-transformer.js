const BitmapHeader = require('./bitmap-header');
module.exports = class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(invert) {
        for(let i = this.header.pixelOffset; i < this.header.fileSize; i = (i += (this.header.bitsPerPixel / 8))) {
            let colors = {
                b: this.buffer.readUInt8(i),
                g: this.buffer.readUInt8(i + 1),
                r: this.buffer.readUInt8(i + 2)
            };
            invert(colors);
            this.buffer.writeUInt8(colors.b, i);
            this.buffer.writeUInt8(colors.g, i + 1);
            this.buffer.writeUInt8(colors.r, i + 2);
        }
    }
};