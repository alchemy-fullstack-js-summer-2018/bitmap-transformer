const fs = require('fs');
const readFrom = require('./read-from');
const getBitmapHeader = require('./get-bitmap-header');

module.exports = class StreamingBitmapTransformer {
    constructor(file, header) {
        this.file = file;
        this.header = header;
    }

    transform(outputFileName) {
        const readStream = fs.createReadStream(this.file, {
            encoding: 'utf8',
            highWaterMark: 300
        });
        readStream.on('data', (chunk) => {
            console.log('****received ${chunk.length} bytesOfData.');
        });
        const writeStream = fs.createWriteStream(outputFileName);
        let total = 0;
        readStream.on('data', chunk => {
            total += chunk.length;
            console.log('chunk', chunk.length, chunk.slice(0, 15));
            writeStream.write(chunk);
        });
        
        readStream.on('close', () => {
            console.log('all done!');
            writeStream.end();
        });
    }
}


