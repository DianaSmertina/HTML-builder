const fs = require('fs');
const path = require('path');

let readableStreamTemplate = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf8');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
  let writeableStreamStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
  readableStreamTemplate.on('data', chunkTemplate => {
    let componentsArray = chunkTemplate.match(/{{\w+}}/g);
    if (componentsArray) {
      fs.readdir(path.join(__dirname, 'components'), (err, dirEntryList) => {

        dirEntryList.forEach(el => {
          let readableStreamComponent = fs.createReadStream(path.join(__dirname, 'components', el), 'utf8');
          readableStreamComponent.on('data', chunkComponent => {

            chunkTemplate = chunkTemplate.replace(`{{${el.split('.')[0]}}}`, chunkComponent);
            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), chunkTemplate, err => {
              if (err) throw err;
            });

          })
        })
      })
    }
  });

  fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, dirEntryList) => {
    if (err) throw err;
    dirEntryList = dirEntryList.filter(el => (el.isFile()) && (el.name.split('.')[1] === 'css'));
    dirEntryList.forEach(el => {
      let readableStream = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf8');
      readableStream.pipe(writeableStreamStyle);
    });
  });


  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
    if (err) throw err; 

    fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, dirEntryList) => {
      if (err) throw err; 
      
      dirEntryList.forEach(el => {
        if (el.isFile() === false) {
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', el.name), { recursive: true }, (err) => {
            if (err) throw err;
            fs.readdir(path.join(__dirname, 'assets', el.name), {withFileTypes: true}, (err, dirInFolders) => {
              if (err) throw err;
              dirInFolders.forEach(file => {
                fs.copyFile(path.join(__dirname, 'assets', el.name, file.name), path.join(__dirname, 'project-dist', 'assets', el.name, file.name), err => {
                  if (err) throw err;
                })
              });
            })
          })
        } else {
          fs.copyFile(path.join(__dirname, 'assets', el.name), path.join(__dirname, 'project-dist', 'assets', el.name), err => {
            if (err) throw err;
          })
        }
      })
    });
  })
})










  


