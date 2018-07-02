const assert = require('assert');
const getBitmapHeader = require('../lib/getBitmapHeader');
const { join } = require('path');


describe.only('GetBitmapHeader:', () => {

    const source = join(__dirname, 'test-bitmap.bmp');

    it('gets data from the getBitmapHeader function', () => {
        return getBitmapHeader(source)
            .then(header => {
                assert.equal(header.pixelOffset, 54);
                assert.equal(header.bitsPerPixel, 24);
                assert.equal(header.fileSize, 30054);
            });
    });
});