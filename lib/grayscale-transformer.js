
module.exports = function grayscale(RGB){
    const avg =  ((RGB.r + RGB.g + RGB.b) / 3); 
    RGB.r = avg;
    RGB.g = avg;
    RGB.b = avg;
    return RGB;
};
