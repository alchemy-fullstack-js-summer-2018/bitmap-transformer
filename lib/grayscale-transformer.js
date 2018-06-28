module.exports = function grayscale(pixel) {
    let avg = (pixel.r + pixel.g + pixel.b) / 3;
    pixel.r = avg;
    pixel.g = avg;
    pixel.b = avg;
    return pixel;
};