const assert = require('assert');
const getBitmapHeader = require('../lib/stream-transformer');
const fs = require('fs');

const readText = file => fs.readFileSync(file, 'utf8');


