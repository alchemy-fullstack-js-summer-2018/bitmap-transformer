const { open, read } = require('fs').promises;

function getBitmapHeader(file, length, position) {
    const buffer = buffer.alloc.length;
    return open(file, 'r')
        .then(fd => read(fd, buffer, 0, length, position))
        .then(contents => contents.buffer);
}

module.exports = getBitmapHeader;
