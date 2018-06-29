const assert = require('assert');
const StreamingBitmapTransformer = require('../lib/stream-transformer');
const { readFile } = require('fs').promises;
const invert = require('../lib/invert-transformer');

describe.only('bitmap file transformer', () => {

    const source = readFile('./test-bitmap.bmp');

    it('test whole transform', () => {

        const bitmap = new StreamingBitmapTransformer(source);
        bitmap.transform(invert);

        return readFile('./test/inverted-expected.bmp')
            .then(() => {
                const expected = readFile('./inverted-expected.bmp');
                assert.equal(source, expected);
            });
    });
});