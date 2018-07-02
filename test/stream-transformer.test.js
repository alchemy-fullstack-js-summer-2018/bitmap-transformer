const assert = require('assert');
const StreamingBitmapTransformer = require('../lib/stream-transformer');
// const getBitmapHeader = require('../lib/getBitmapHeader');
const invert = require('../lib/invert-transformer');
// const { readFile } = require('fs').promises;
// const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    const actualFile = 'test-bitmap.bmp';    
    // beforeEach(() => {
    //     source = new StreamingBitmapTransformer(actualFile, getBitmapHeader(actualFile)
    //         .catch(err => {
    //             if(err.code !== 'ENOENT') throw err;
    //         })
    //         .then(result => console.log(result))
    //     );
    // });


    it('runs the transform function', () => {
        return StreamingBitmapTransformer.create(actualFile)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            })
            .then(bitmapTransformer => {
                return bitmapTransformer.transform(invert, actualFile)
                    .then(result => console.log(result));
            });
        // return source.transform(invert, actualFile)
        //     .then(() => {
        //         const actual = actualFile;
        //         const expected = './inverted-expected.bmp';
        //         assert.equal(actual, expected);
        //     });
    });
});