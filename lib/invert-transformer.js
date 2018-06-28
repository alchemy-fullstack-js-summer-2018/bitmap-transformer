module.exports = { invert }; 
function invert(rgb) { 
    rgb.r = 255 - rgb.r,
    rgb.g = 255 - rgb.g,
    rgb.b = 255 - rgb.b;
    return rgb;
}