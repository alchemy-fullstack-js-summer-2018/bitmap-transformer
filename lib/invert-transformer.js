module.exports = function invert(obj) {
    for(let prop in obj) {
        obj[prop] = 255 - obj[prop];
    }
    return obj;
};