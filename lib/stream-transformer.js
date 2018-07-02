const fs = require('fs');
const getBitmapHeader = require('./getBitmapHeader');
// const { readFrom } = require('./readFrom');
// const constants = require('./bitmap-constants');

class StreamingBitmapTransformer {
    constructor(filePath, header) {
        this.filePath = filePath;
        this.header = header;
    }

    transform(transform, outputFileName) {
        const writeStream = fs.createWriteStream(outputFileName);
        const readStream = fs.createReadStream(this.filePath, {
            start: this.header.pixelOffset,
            end: this.header.fileSize,
            highWaterMark: 255
        });

        return new Promise((resolve, reject) => {
            readStream.on('data', chunk => {
                const changed = transform(chunk.readUInt32LE());
                writeStream.write(changed.writeUint32LE());
                console.log(changed);
            });

            readStream.on('end', resolve => {
                writeStream.end(resolve);
            });

            readStream.on('error', reject);

        });

        // for(let i = this.header.pixelOffset; i < this.header.fileSize; i += (this.header.bitsPerPixel / 8)) {
        //     const pixel = {
        //         r: this.buffer.readUInt8(i + 2),
        //         g: this.buffer.readUInt8(i + 1),
        //         b: this.buffer.readUInt8(i)
        //     };
        //     transform(pixel);

        //     this.buffer.writeUInt8(pixel.b, i);
        //     this.buffer.writeUInt8(pixel.g, i + 1);
        //     this.buffer.writeUInt8(pixel.r, i + 2);
        // }

    }
}

StreamingBitmapTransformer.create = function(bitmapFilePath) {
    return getBitmapHeader(bitmapFilePath)
        .then(bitmapHeader => {
            return new StreamingBitmapTransformer(bitmapFilePath, bitmapHeader);
        });
};



module.exports = StreamingBitmapTransformer;