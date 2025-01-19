const fs = require('fs/promises');
const path = require('path');

const filesDir = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy');

async function copyDir() {
  await fs.mkdir(filesCopy, {recursive: true});
  const files = await fs.readdir(filesDir);

  for (let file of files) {
    const filesPatch = path.join(filesDir, file);
    const copyPath = path.join(filesCopy, file);
    const stats = await fs.stat(filesPatch);

    if (stats.isFile()) {
      await fs.copyFile(filesPatch, copyPath);
    }
  }
  console.log('Copying is complete!');
}

copyDir()

