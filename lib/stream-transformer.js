class getBitmapHeader {
    constructor(filePath) {
        this.filePath = filePath;
        this.pixelOffset = filePath.readInt8(10);
        this.bitsPerPixel = filePath.readInt8(28);
    }
}