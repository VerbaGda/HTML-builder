const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'text.txt');
const createReader = fs.createReadStream(pathFile);

createReader.on('data', (chunk) => {
  console.log(chunk.toString());
});
