module.exports = function invert(rgb) {
    const maxRGB = 255; 
    return {
        r: maxRGB - rgb.r,
        g: maxRGB - rgb.g,
        b: maxRGB - rgb.b
    };
    
};



