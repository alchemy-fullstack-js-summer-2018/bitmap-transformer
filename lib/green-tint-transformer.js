module.exports = { tint }; 
function tint(rgb) {  
    // rgb.r = rgb.r
    rgb.g = rgb.g + 30; 
    // rgb.b = rgb.b
    return rgb;
}