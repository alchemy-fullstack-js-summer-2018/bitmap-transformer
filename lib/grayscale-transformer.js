module.exports = function grayscale(rgb) {
    const avg = (rgb.r + rgb.g + rgb.b) / 3; 
    return {
        r: avg,
        g: avg,
        b: avg
    };  
};