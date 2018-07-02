const assert = require('assert');
const getBitmapHeader = require('../lib/get-bitmap-header');
const { join } = require('path');

describe('get bitmap header', () => {
    const source = join(__dirname, 'test-bitmap.bmp');

    it('gets bitmap header details', () => {
        return getBitmapHeader(source)
            .then(header => {
                assert.equal(header.pixelOffset, 54);
                assert.equal(header.bitsPerPixel, 24);
                assert.equal(header.fileSize, 30054);
            });
    });
});