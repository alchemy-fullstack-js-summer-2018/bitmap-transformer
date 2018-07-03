module.exports = function grayscaleLuminosity(pixel) {
    let avg = ((pixel.r * 0.21) + (pixel.g * 0.72) + (pixel.b * 0.07)) / 3;
    pixel.r = Math.floor(avg);
    pixel.g = Math.floor(avg);
    pixel.b = Math.floor(avg);
    return pixel;
};