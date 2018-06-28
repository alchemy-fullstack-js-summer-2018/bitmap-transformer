const { getBitmapHeader } = require('./getBitmapHeader');

class StreamingBitmapTransformer {
    constructor(filePath, header) {
        this.filePath = filePath;
        this.header = header;
    }

    transform() {

    }
}

StreamingBitmapTransformer.create = function(bitmapFilePath) {
    return getBitmapHeader(bitmapFilePath)
        .then(bitmapHeader => {
            return new StreamingBitmapTransformer(bitmapFilePath, bitmapHeader);
        });
};

module.exports = StreamingBitmapTransformer;