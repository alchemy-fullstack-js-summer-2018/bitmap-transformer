const assert = require('assert');
const StreamingBitmapTransformer = require('../lib/stream-transformer');
const { readFile } = require('fs').promises;
const invert = require('../lib/invert-transformer');

describe.only('bitmap file transformer', () => {
    const actualFile = './test-bitmap.bmp';

    let source = null;
    beforeEach(() => {
        source = new StreamingBitmapTransformer('./test-bitmap.bmp');
    });

    it('test whole transform', () => {
        return source.transform(invert, actualFile)
            .then(() => {
                const actual = readFile(actualFile);
                const expected = readFile('./inverted-expected.bmp');
                assert.equal(actual, expected);
            });
    });
});