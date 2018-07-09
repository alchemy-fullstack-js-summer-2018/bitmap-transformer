const assert = require('assert');
const { join } = require('path');
const StreamingBitmapTransformer = require('../lib/stream-transformer');
const invert = require('../lib/invert-transformer');
const { unlink } = require('fs').promises;
const fs = require('fs');
const readFile = file => fs.readFileSync(file);

describe('bitmap file transformer', () => {
    const source = join(__dirname, 'test-bitmap.bmp');
    const inverted = './test/inverted-bitmap.bmp';
    beforeEach(() => {
        return unlink(inverted)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err;
            });
    });

    it('runs the invert transformation function', () => {
        return StreamingBitmapTransformer.create(source)
            .then(bitmapTransformer => {
                return bitmapTransformer.transform(invert, inverted)
                    .then(() => {
                        const actual = readFile(inverted);
                        const expected = readFile('./test/inverted-bitmap.bmp');
                        assert.deepEqual(actual, expected);
                    });
            });
    });
});