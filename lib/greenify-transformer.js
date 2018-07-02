function greenify(pixel) {
    const avg = parseInt((pixel.r + pixel.g + pixel.b) / 3);
    pixel.r = avg;
    pixel.g = avg < 170 ? parseInt(avg * 1.5) : 255;
    pixel.b = avg; 
    return pixel;
}

module.exports = {
    greenify
};