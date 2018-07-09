function invert(object) {
    object.r = 255 - object.r;
    object.g = 255 - object.g;
    object.b = 255 - object.b;
    return object;
}
module.exports = invert;