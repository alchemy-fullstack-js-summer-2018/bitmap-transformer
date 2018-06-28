module.exports = function tint(rgb) {
    const green = rgb.g + 30;
    return {
        r: rgb.r,
        g: green,
        b: rgb.b
    };  
};