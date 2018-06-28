const PIXEL_OFFSET = 10;
const BITS_PER__PIXEL_OFFSET = 24;
const FILE_SIZE_OFFSET = 2;

function bmpHeader(buffer) {
    for(let i = 0; i < buffer.length; i++) {
        const byte = buffer.readInt8(i);
        if(byte === b) buffer.writeInt8(f, i);
        if(byte === B) buffer.writeInt8(F, i);
    }
}

module.exports = {
    bmpHeader
};