function invert(object) {
    this.r = 255 - object.r;
    this.g = 255 - object.g;
    this.b = 255 - object.b;
    return object;
}