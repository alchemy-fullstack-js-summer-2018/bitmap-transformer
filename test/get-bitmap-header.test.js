const assert = require('assert');
const getBitmapHeader = require('../lib/get-bitmap-header');
const path = require('path');

describe('NEW bitmap header', () => {

    const source = path.join(__dirname, 'test-bitmap.bmp');
    
    it('parses header data', () => {
        // TODO: use the constants to populate the following properties
        // on the BitmapHeader in its constructor.
        // These test values are correct for the supplied test-bitmap.bmp
        return getBitmapHeader(source)
            .then(header => {
                assert.equal(header.pixelOffset, 54);
                assert.equal(header.fileSize, 30054);
                assert.equal(header.bitsPerPixel, 24);
            });
    });
});