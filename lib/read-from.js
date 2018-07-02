const { open, read } = require('fs').promises;

function readFrom(file, length, position = 0) {
    const buffer = Buffer.alloc(length);

    return open(file, 'r')
        .then(fd => read(fd, buffer, 0, length, position))
        .then(contents => contents.buffer);
}

module.exports = readFrom;