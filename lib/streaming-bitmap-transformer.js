const fs = require('fs');
const { readFlile } = require('fs').promises;
const readFrom = require('./read-from');
const getBitmapHeader = require('./getBitmapHeader.js');

class StreamingBitmapTransformer {
    constructor(filePath, header) {
        this.filePath = filePath;
        this.header = header;
    }

    transform(transformFuction, outputFile) {
        const writeStream = fs.createWriteStream(outputFile);
        readFrom(this.filePath, this.header.pixelOffset, 0)
            .then(buffer => {
                writeStream.write(buffer);
            });
        const readStream = fs.createReadStream(this.filePath, {
            highWaterMark: 255,
            start: this.header.pixelOffset,
            end: this.header.fileSize
        });
        return new Promise((resolve, reject) => {
            readStream.on('data', chunk => {
                let pixel = {};

                for(let i = 0; i < chunk.length; i += 3) {
                    pixel.r = chunk.readUInt8(i + 2);
                    pixel.g = chunk.readUInt8(i + 1);
                    pixel.b = chunk.readUInt8(i);
                    transformFuction(pixel);
                    chunk.writeUInt8(pixel.b, i);
                    chunk.writeUInt8(pixel.g, i + 1);
                    chunk.writeUInt8(pixel.r, i + 2);
                }

                writeStream.write(chunk);
            });
            readStream.on('end', () => {
                writeStream.end(resolve);
            });
            readStream.on('error', reject);
        });
    }
}

StreamingBitmapTransformer.create = function(bitmapFilePath) {
    return getBitmapHeader(bitmapFilePath)
        .then(bitmapHeader => {
            return new StreamingBitmapTransformer(bitmapFilePath, bitmapHeader);
        });
};

module.exports = StreamingBitmapTransformer;






// const BitmapHeader = require('./getBitmapHeader');
// module.exports = class BitmapTransform {
//     constructor(buffer) {
//         this.buffer = buffer;
//         this.header = new BitmapHeader(buffer);
//     }

//     transform(invert) {
//         for(let i = this.header.pixelOffset; i < this.header.fileSize; i = (i += (this.header.bitsPerPixel / 8))) {
//             let colors = {
//                 b: this.buffer.readUInt8(i),
//                 g: this.buffer.readUInt8(i + 1),
//                 r: this.buffer.readUInt8(i + 2)
//             };
//             invert(colors);
//             this.buffer.writeUInt8(colors.b, i);
//             this.buffer.writeUInt8(colors.g, i + 1);
//             this.buffer.writeUInt8(colors.r, i + 2);
//         }
//     }
// };