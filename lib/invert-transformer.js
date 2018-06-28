function invert(object) {
    let newObject = {};
    newObject.r = 255 - object.r;
    newObject.g = 255 - object.g;
    newObject.b = 255 - object.b;
    return newObject;
}
module.exports = {
    invert
};