

const pixelOffset = this.pixelOffset(constants.PIXEL_OFFSET);
const bitsPerPixel = this.bitsPerPixel(constants.BITS_PER_PIXEL_OFFSET);
const fileSize = this.fileSize(constants.FILE_SIZE_OFFSET);

class BitmapHeader {
    constructor(buffer) {
        for(let i = 10; i < buffer.length; i + 4){
            const byte = buffer.readInt8(i);
            return byte;
        }
    }
}
