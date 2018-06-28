const assert = require('assert');
const { readFile } = require('../lib/fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const { invert } = require('../lib/invert-transformer');
const { join } = require('path');

describe.only('bitmap file transformer', () => {

    const source = join(__dirname, 'test-bitmap.bmp');
    
    let buffer = null;
    beforeEach(() => {
        return readFile(source)
            .then(b => buffer = b);
    });

    it('test whole transform', () => {
    
        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(invert);

        return readFile('./test/inverted-expected.bmp')
            .then(expected => {
                assert.deepEqual(bitmap.buffer, expected);
            });
    });
});