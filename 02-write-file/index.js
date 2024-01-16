const path = require('path');
const fs = require('fs');
const process = require('process');
const readline = require('readline');

const getPath = (filename) => path.join(__dirname, filename);
const fileName = "02-write-file.txt";
const writeableStream = fs.createWriteStream(getPath(fileName));

const {
  stdin: input,
  stdout: output,
} = require('process');

const rl = readline.createInterface({ input, output });
console.log('Hey, good to see you! Enter some text:');

rl.on('line', (input) => {

  if (input === 'exit') {
    writeableStream.end();
    rl.close();
    process.exit();
  }
  writeableStream.write(`${input}\n`);
});

process.on('exit', () => {
  console.log('Goodbye, come back again.');
});

