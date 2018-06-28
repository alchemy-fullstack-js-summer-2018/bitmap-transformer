const { getBitmapHeader } = require('./getBitmapHeader');

class StreamingBitmapTransformer {
    constructor(filePath, header) {
        this.filePath = filePath;
        this.header = header;
    }

    transform(transformation, outputFileName) {
        const writeStream = fs.createWriteStream(outputFileName);
        const readStream = fs.createReadStream(this.filename, {
            encoding: 'utf8',
            highWaterMark: 252 //this will return 42 sets of rgb colors
        });

        return new Promise((resolve, reject) => {
            let leftOvers = '';

            readStream.on('data', chunk => {
                chunk = leftOvers + chunk;
                leftOvers = '';

                const changed = transformation(chunk);
                writeStream.write(changed);
            });
            writeStream.end(resolve);
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