const { join } = require('path');
const StreamBitmapTransformer = require('../lib/StreamBitmapTransformer');
const { readFile } = require('fs').promises;
const { invert } = require('../lib/invert-transformer');
const assert = require('assert');

describe('streams bitmap transformer', () => {

    const source = join(__dirname, 'test-bitmap.bmp');
    const invertedActual = 'inverted-actual.bmp';

    it('transforms/inverts the image', () => {
        StreamBitmapTransformer.create(source)
            .then(streamTransformer => {
                return streamTransformer.transform(invert, invertedActual);
            })
            .then(() => {
                const actual = readFile(invertedActual);
                const expected = readFile('./test/inverted-expected.bmp');
                assert.deepEqual(actual, expected);
            });
    });
});
