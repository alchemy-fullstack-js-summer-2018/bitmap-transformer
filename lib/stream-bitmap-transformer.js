const fs = require('fs');

const readStream = fs.createReadStream('../test/test-bitmap.bmp', {
    encoding: 'utf8',
    highWaterMark: 300
});

const writeStream = fs.createWriteStream('copy-txt');

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