module.exports = function invert(RGB){

    return {
        r: 255 - RGB.r,
        g: 255 - RGB.g,
        b: 255 - RGB.b
    };
};