const assert = require('assert');
// const { readFile } = require('fs').promises;
const { join } = require('path');
const constants = require('../lib/bitmap-constants');
const getBitmapHeader = require('../lib/getBitmapHeader');

describe('bitmap header', () => {
    const source = join(__dirname, 'test-bitmap.bmp');

  
    // beforeEach(() => {
    //     return readFile(source)
    //         .then(b => buffer = b);
    // });
    
    it('has correct specs', () => {
        assert.ok(constants.PIXEL_OFFSET);
        assert.ok(constants.BITS_PER_PIXEL_OFFSET);
        assert.ok(constants.FILE_SIZE_OFFSET);
    });

    it('parses header data', () => {
        return getBitmapHeader(source)
            .then(header => {
                assert.equal(header.pixelOffset, 54);
                assert.equal(header.bitsPerPixel, 24);
                assert.equal(header.fileSize, 30054);
            });
    });
});