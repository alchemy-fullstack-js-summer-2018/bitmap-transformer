const fs = require('fs');
const readFrom = require('./read-from');
const getBitmapHeader = require('./get-bitmap-header');

module.exports = class StreamingBitmapTransformer {
    constructor(file, header) {
        this.file = file;
        this.header = header;
    }

    transform(transformation, outputFileName) {
        const writeStream = fs.createWriteStream(outputFileName);
        const readStream = fs.createReadStream(this.file, {
            highWaterMark: 255,
            start: this.header.pixelOffset,
            end: this.header.fileSize
        });
        
        return new Promise((resolve, reject) => {
            readFrom(this.file, this.header.pixelOffset, 0)
                .then(buffer => {
                    writeStream.write(buffer);

                    readStream.on('data', chunk => {
                        for(let i = 0; i < chunk.length; i += 3){
                            console.log(chunk);
                            const streamPixel = {
                                r: chunk.readUInt8(i + 2),
                                g: chunk.readUInt8(i + 1),
                                b: chunk.readUInt8(i)
                            };
                            const newPixel = transformation(streamPixel);
                            const buffer = Buffer.alloc(3);

                            buffer.writeUInt8(newPixel.b, 0);
                            buffer.writeUInt8(newPixel.g, 1);
                            buffer.writeUInt8(newPixel.r, 2);

                            writeStream.write(buffer);
                        }
                    }),

                    readStream.on('close', () => {
                        console.log('all done!');
                        writeStream.end(resolve);
            
                    }),

                    readStream.on('error', reject);

                });
        });
    }

    static create(file) {
        return getBitmapHeader(file)
            .then(header => {
                return new Promise(resolve => {
                    return resolve(new StreamingBitmapTransformer(file, header));
                });
            });
    }
};