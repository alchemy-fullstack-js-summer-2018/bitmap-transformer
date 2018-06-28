const assert = require('assert');
const invert = require('../lib/invert-transformer');
const grayscale = require('../lib/grayscale-transformer');
const grayscaleLuminosity = require('../lib/luminosity-transformer');

describe('transformers', () => {

    it('invert', () => {
        // HINT: invert subtracts each value from 255
        const transformed = invert({
            
            b: 205,
            g: 100,
            r: 34
        });

        assert.deepEqual(transformed, {
            b: 50,
            g: 155,
            r: 221
        });
    });

    it('grayscale', () => {
        // HINT: grayscale assigns the average of all three colors
        // as the new value for each color
        const transformed = grayscale({
            b: 205,
            g: 100,
            r: 34
        });

        assert.deepEqual(transformed, {
            b: 113,
            g: 113,
            r: 113
        });
    });

    // TODO: add a third transformer (you'll need to add the module and require!) and test
    it('grayscale luminosity', () => {
        // HINT: uses luminositry formula to determine
        // the new grey value for each color 0.21 R + 0.72 G + 0.07 B
        const transformed = grayscaleLuminosity({
            b: 205, // 14
            g: 100, // 72
            r: 34 // 7
        });

        assert.deepEqual(transformed, {
            b: 31,
            g: 31,
            r: 31
        });
    });
});