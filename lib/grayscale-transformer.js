module.exports = {
    grayscale
};

function grayscale(image) {
    let avg = ((image.r + image.g + image.b) / 3);
    image.r = avg;
    image.g = avg;
    image.b = avg;
    return image; 
}