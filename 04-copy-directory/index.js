const fs = require('fs');
const path = require('path');


function addFiles () {
  fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, dirEntryList) => {
    if (err) throw err;
    dirEntryList.forEach(el => {
      fs.copyFile(path.join(__dirname, 'files', el.name), path.join(__dirname, 'files-copy', el.name), err => {
        if (err) throw err;
      })
    });
  })
} 

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}, (err, dirEntryListCopy) => {
    if (err) throw err;
    if (dirEntryListCopy !== []) {
      dirEntryListCopy.forEach(el => {
        fs.unlink(path.join(__dirname, 'files-copy', el.name), err => {
          if (err) throw err;
        })
      });
    } 
      addFiles();
  })
})