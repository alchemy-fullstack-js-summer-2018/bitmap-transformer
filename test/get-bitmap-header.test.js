const getBitmapHeader = require('../lib/get-bitmap-header');

describe('get bitmap header', () => {

    
    it('gets bitmap header data', () => {
        // TODO: use the constants to populate the following properties
        // on the BitmapHeader in its constructor.
        // These test values are correct for the supplied test-bitmap.bmp
        const file = './test/test-bitmap.bmp';
        const length = 54;
        const position = '0';
        const header = getBitmapHeader(file, length, position);
        assert.equal(header.pixelOffset, 54);
        assert.equal(header.fileSize, 30054);
        assert.equal(header.bitsPerPixel, 24);
    });
});