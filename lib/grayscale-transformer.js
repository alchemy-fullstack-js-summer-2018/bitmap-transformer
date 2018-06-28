module.exports = { grayscale };
function grayscale(rgb) {
    const avg = (rgb.r + rgb.g + rgb.b) / 3; 
    rgb.r = avg;
    rgb.g = avg;
    rgb.b = avg;
    return rgb;
}