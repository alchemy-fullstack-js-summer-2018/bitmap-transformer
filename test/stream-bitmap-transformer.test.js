const assert = require('assert');
const fs = require('fs');
const { readFile } = require('fs').promises;
const StreamingBitmapTransformer = require('../lib/stream-bitmap-transformer');
const invert = require('../lib/invert-transformer');
const getBitmapHeader = require('../get-bitmap-header');

const readText = file => fs.readFileSync(file, 'utf8');

describe('transforming the stream', () => {
    let transformer = null;
    beforeEach(() => {
        transformer = new StreamingBitmapTransformer('./test/test-bitmap.bmp');
    }); 

    it('inverts the stream', () => {
        return transformer.transform(invert, './test/actual-inverted.bmp')
            .then(() => {
                const actual = readText('./test/actual-inverted.bmp');
                const expected = readText('./test/inverted.expected.bmp');
                assert.equal(actual, expected);
            });
    });
});