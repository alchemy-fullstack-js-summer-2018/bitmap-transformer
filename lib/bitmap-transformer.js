const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {
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
        for(let i = this.header.pixelOffset; i < this.header.fileSize; i += this.header.bitsPerPixel) {
            const pixel = {
                b: this.buffer.readUInt8(i),
                g: this.buffer.readUInt8(i + 2),
                r: this.buffer.readUInt8(i + 4)
            };
            // console.log(this.buffer.readInt8(i));
            fn(pixel);

            this.buffer.writeUInt8(pixel.b, i);
            this.buffer.writeUInt8(pixel.g, i + 2);
            this.buffer.writeUInt8(pixel.r, i + 4);
        }

        
        // we will have access to rgb values at next 8 positions in the buffer
        //need to get values for b, g, r pixels
        //b is at i 0-1, g is at i 2-3 and r is at i 4-5 5-6 are the padding bits
        // const obj = {};
        // let obj.g = (i+2).toString() + (i+3).toString(); 
        // let obj.r = (i+4).toString() + (i+5).toString();
        // let obj.pad = (i+6).toString() + (i+7).toString();
        
        // 1. Pass to the transformation function, which returns a transformed color object
            
    }
    //write transformed colors back to buffer
};