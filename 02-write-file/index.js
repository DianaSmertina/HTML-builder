const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output, } = require('process');
let writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf8');
const rl = readline.createInterface({ input, output });

function close() {
  return rl.close(console.log('Goodbye'));
}

function writeAnswer(message) {
  if (message !== 'exit') {
    writeableStream.write(`${message}\r\n`);
  } else {
    close();
  }
}

rl.question('Write any text \r\n', (answer) => {
  writeAnswer(answer);
  rl.on('line', (input) => {
    writeAnswer(input);
  });
  rl.on('SIGINT', close);
});