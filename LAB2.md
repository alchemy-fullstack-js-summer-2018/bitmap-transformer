Streaming Transformer
===

Evolve your bitmap transform to be streaming!

**NOTE:** Develop a parallel version, don't try and change existing files!

## `BitmapHeader` to `getBitmapHeader`

* Change BitmapHeader to be a function (`getBitmapHeader`) that
    * takes a filename as input,
    * returns a promise,
    * that resolves to an object (literal) with the header properties.
    * (HINT: Use `readFrom` function we created in class)
* Test will need to evolve as well: 
    * Use mocha async test
  
## BitmapTransformer

* Add a static `create` method that takes a `filename` of the source bitmap:
  * Creates the header (async)
  * Passes that to BitmapTransformer along with filename
  * Returns promise that resolves to bitmapTransformer instance
* `transform`
  * Change signature:
      * First parameter is a transform function
      * second paramter is output filename to write to!
  * createWriteStream of output filename
      * Remember to **copy** the file up to image pixels into write stream!
      * (HINT: 
          * Put the filename onto `this.filename`
          * Use `readFrom` function we created in class
  * Use `filename` to createReadStream (HINT: start at offset)
  * Read chunks (do the math! - test with `highWaterMark`)
  * Write transformed chunks to write stream
  * End writeStream on readStream close
  * Return promise that fires when done!
  
## Rubric:
* Bitmap Header
    * Tests (async) **2pt**
    * Async functionality and limited in read size **4pts**
* Bitmap Header 
    * Tests (async) **4pt**
    * New Async transform method
        * Functionaly correct **6pts**
        * Proper async management **4pts**

## Bonus

* See `LAB.md` for original bonus ideas
* Allow `.transform` to accept an array of tranform functions. Apply each tranformation to each pixel
