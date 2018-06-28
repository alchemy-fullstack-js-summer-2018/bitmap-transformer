const BitmapHeader = require('./bitmap-header');
// const { invert } = require('../lib/invert-transformer');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
        const incrimentor = this.bitsPerPixel / 8;
        for(let i = this.header.bitsPerPixel; i < this.header.fileSize; i += incrimentor){
            const colorObject = {
                r: this.buffer.readUInt8(i + 2),
                g: this.buffer.readUInt8(i + 1),
                b: this.buffer.readUInt8(i)
            };
            fn(colorObject);
            this.buffer.writeUInt8(colorObject.b, i);
            this.buffer.writeUInt8(colorObject.g, i + 1);
            this.buffer.writeUInt8(colorObject.r, i + 2);
        }
        // this is a guide to what needs to happen
        // not a recipe

        // you have access to the data you need:
        // this.buffer
        // this.header.pixelOffset
        // this.header.bitsPerPixel
        // this.header.fileSize

        // Find the right place (offset) in the buffer from which to start your loop.
        // Keep in mind that the loop will need to "step" by something other than 1.
        // For each loop:
        // 1. Read the individual color values into a color object
        // 1. Pass to the transformation function, which returns a transformed color object
        // 1. Write the transformed color values back into the buffer
    }
};