class getBitmapTransformer {
    constructor(stream) {
        this.stream = stream;
        this.header = new getBitmapHeader(stream);
    }