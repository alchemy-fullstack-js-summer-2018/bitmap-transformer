function grayscale(object) {
    let newObject = {};
    let gray = (object.r + object.g + object.b) / 3;
    newObject.r = gray;
    newObject.g = gray;
    newObject.b = gray;
    return newObject;
}
module.exports = {
    grayscale
};