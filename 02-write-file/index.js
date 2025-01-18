const fs = require('fs');
const path = require('path');
const readline = require('readline');

const pathFile = path.join(__dirname, 'write.txt');
const writeSteam = fs.createWriteStream(pathFile);
console.log('Welcome!');

let rl = readline.createInterface(process.stdin, process.stdout);
rl.prompt();
rl.on('line', (input) => {
  if (input.toString().trim() === 'exit') {
    console.log('Goodbye!');
    rl.close();
  } else {
    writeSteam.write(input + '\n');
    console.log(
      'Comment saved. Write another comment or "exit" or ctrl + C to finish',
      input,
    );
    rl.prompt();
  }
});
rl.on('SIGINT', () => {
  console.log('\nGoodbye!');
  rl.close();
});
rl.on('close', () => {
  writeSteam.end();
  process.exit(0);
});
