const fs = require('fs');
// const { readFile } = require('fs').promises;
// const { readFile } = require('./fs');
const readFrom = require('./read-from');
const getBitmapHeader = require('./getBitmapHeader');


class StreamBitmapTransformer {
    constructor(filePath, header) {
        this.filePath = filePath;
        this.header = header;
    }
    
    // Create a transform function that takes a transformation and outputs it to a file 
    transform(transformation, outputFileName) {
        // Designates output file
        const writeStream = fs.createWriteStream(outputFileName);
        // Tells transform where to read from (beginning of image pixel data)
        readFrom(this.filePath, this.header.pixelOffset, 0)
            .then(buffer => {
                // Writes data to the buffer
                writeStream.write(buffer);
            });
        // designates the high water mark for chunk size and where to start and end streaming
        const readStream = fs.createReadStream(this.filePath, {
            //high water mark at 255 (divisible evenly by 3 (pixel size))
            highWaterMark: 255,
            start: this.header.pixelOffset, 
            end: this.header.fileSize
        });
        //starts read stream promise
        return new Promise((resolve, reject) => {
            //begins stream, taking the file path and chunk data
            readStream.on('data', chunk => {
                const pixel = {};
                //reads 3 bytes at a time, for (pixel) R, G, B:
                for(let i = 0; i < chunk.length; i += 3) {
                    pixel.r = chunk.readUInt8(i + 2);
                    pixel.g = chunk.readUInt8(i + 1);
                    pixel.b = chunk.readUInt8(i);
                    //pass this to the transform function designated in test
                    transformation(pixel);
                    //changes transformed pixels in buffer
                    chunk.writeUInt8(pixel.b, i);
                    chunk.writeUInt8(pixel.g, i + 1);
                    chunk.writeUInt8(pixel.r, i + 2);
                }
                //writes to designated output file
                writeStream.write(chunk);
            });
            //end read and write streams
            readStream.on('end', () => {
                writeStream.end(resolve);
            });
            
            readStream.on('error', reject);
        });      
    }
    
}
// Static create method that takes a filename of source bitmap 
// Then creates a header
StreamBitmapTransformer.create = function(filePath) {
    return getBitmapHeader(filePath)
        .then(header => {
            //  Pass header and filename to bitmap transformer
            //  Returns promise that resolves to bitmap transformer instance
            return new StreamBitmapTransformer(filePath, header);
        });
};

module.exports = StreamBitmapTransformer;
