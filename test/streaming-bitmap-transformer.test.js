const assert = require('assert');
const { readFile, unlink } = require('fs').promises;
const { join } = require('path');
const StreamingBitmapTransformer = require('../lib/streaming-bitmap-transformer');
const  { invert } = require('../lib/invert-transformer');


describe.only('bitmap file transformer', () => {
    const source = join(__dirname, 'test-bitmap.bmp');
    const invertedBitmap = './test/streaming-invert.bmp';

    // beforeEach(() => {
    //     return unlink(invertedExpected)
    //         .catch(err => {
    //             if(err.code !== 'ENOENT') throw err;
    //         });
    // });

    it('test whole transform', () => {
        StreamingBitmapTransformer.create(source)
            .then(streamingTransformer => {
                return streamingTransformer.transform(invert, invertedBitmap);
            })
            .then(() => {
                const actual = readFile(invertedBitmap);
                const expected = readFile('./test/inverted-expected.bmp');
                assert.deepEqual(actual, expected);
            });
    });
});