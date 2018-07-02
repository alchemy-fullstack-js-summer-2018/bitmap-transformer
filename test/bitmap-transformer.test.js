const assert = require('assert');
const { readFile, writeFile } = require('fs').promises;
const BitmapTransformer = require('../lib/bitmap-transformer');
const  { invert } = require('../lib/invert-transformer');
const { grayscale } = require('../lib/grayscale-transformer');
const { join } = require('path');

describe('bitmap file transformer', () => {

    const source = join(__dirname, 'test-bitmap.bmp');
    
    let buffer = null;
    beforeEach(() => {
        return readFile(source)
            .then(b => buffer = b);
    });

    // it.skip('test whole transform', () => {});

    it('Invert test', () => {   
        const bitmap = new BitmapTransformer(buffer);

        bitmap.transform(invert);

        return readFile('./test/inverted-expected.bmp')
            .then(expected => {
                assert.deepEqual(bitmap.buffer, expected);
            });
    });
    it('test GRAYSCALE transform', () => {
        const bitmap = new BitmapTransformer(buffer);
        bitmap.transform(grayscale);
        writeFile('./test/grayscale-expected.bmp', bitmap.buffer);
        return readFile('./test/grayscale-expected.bmp')
            .then(expected => {
                assert.deepEqual(bitmap.buffer, expected);
                
            });
    });
});