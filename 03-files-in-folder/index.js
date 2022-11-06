const fs = require('fs');
const path = require('path');

let files = fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (error, dirEntryList) => {
  if (!error) {
    dirEntryList = dirEntryList.filter(el => el.isFile());
    
    dirEntryList.forEach(el => {
      let fileName = el.name.split('.')[0];
      let fileExtension = el.name.split('.')[1];
      let stats = fs.stat(path.join(__dirname, 'secret-folder', el.name), (err, stats) => {
        if (!err) {
          let fileWeight = stats.size;
          console.log(`${fileName} - ${fileExtension} - ${fileWeight}b`);
        }
      });
    });
  } else {
    console.error(error);
  }
});
