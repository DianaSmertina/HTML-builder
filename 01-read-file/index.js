const fs = require('fs');
const path = require('path');
let textFromFile = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
textFromFile.on('data', function(chunk) {
  console.log(chunk);
});
