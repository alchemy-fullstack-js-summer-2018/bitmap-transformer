const assert = require('assert');
const getBitmapHeader = require('../lib/getBitmapHeader');
const { join } = require('path');

describe('bitmap header function', () => {
    const source = join(__dirname, 'test-bitmap.bmp');

    it('gets the bitmap header pixel offset', () => {
        return getBitmapHeader(source)
            .then(header => {
                assert.equal(header.pixelOffset, 54);
            });
    });
    it('gets the bitmap header bits per pixel', () => {
        return getBitmapHeader(source)
            .then(header => {
                assert.equal(header.bitsPerPixel, 24);
            });
    });
    it('gets the bitmap header file size', () => {
        return getBitmapHeader(source)
            .then(header => {
                assert.equal(header.fileSize, 30054);
            });
    });
});