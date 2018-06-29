const assert = require('assert');
const { readFile } = require('fs').promises;
const BitmapTransformer = require('../lib/bitmap-transformer');
const getBitmapHeader = require('../lib/get-bitmap-header');

describe('get bitmap header', () => {
//a function that takes a file name as an input
    function readFrom(file, length, position = 0) {
        const buffer = Buffer.alloc(length);
        return open(file, 'r')
        // fd === "file descriptor"
        .then(fd => read(fd, buffer, 0, length, position))
        .then(contents => contents.buffer);
        // returns a promise that resolves to an object with 
        // the header properties: Pixel offset, bitsPerPixel, fileSize
        
    });
    
    const file = './test/test-bitmap.bmp';
    const length = 10;
    const position = 5;
    