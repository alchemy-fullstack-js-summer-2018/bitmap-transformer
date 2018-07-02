const fs = require('fs');
const readFrom = require('./read-from');
const getBitmapHeader = require('./get-bitmap-header.js');

class StreamingBitmapTransformer {
    constructor(filePath, header) {
        this.filePath = filePath;
        this.header = header; 
    }

    transform(transformType, fileNameCreated) {

        return readFrom(this.filePath, this.header.pixelOffset, 0)
            .then(buffer => {
                fileNameCreated = buffer;
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