const fs = require('fs');
const path = require('path');
let writeableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, dirEntryList) => {
  if (err) throw err;
  dirEntryList = dirEntryList.filter(el => (el.isFile()) && (el.name.split('.')[1] === 'css'));
  dirEntryList.forEach(el => {
    let readableStream = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf8');
    readableStream.pipe(writeableStream);
  });
});